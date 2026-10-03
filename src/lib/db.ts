/** Local IndexedDB — no cloud. Holds users, sessions, and app state on this device. */

const DB_NAME = "pth-pk-v1";
const DB_VER = 1;

export type LocalUser = {
  id: string;
  name: string;
  email: string;
  passHash: string;
  createdAt: string;
  lastLogin: string;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("users")) {
        const u = db.createObjectStore("users", { keyPath: "id" });
        u.createIndex("email", "email", { unique: true });
      }
      if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv", { keyPath: "key" });
      if (!db.objectStoreNames.contains("events")) {
        const e = db.createObjectStore("events", { keyPath: "id", autoIncrement: true });
        e.createIndex("at", "at");
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const t = db.transaction(store, mode);
        const req = fn(t.objectStore(store));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
  );
}

export async function kvGet<T>(key: string): Promise<T | null> {
  try {
    const row = await tx<{ key: string; value: T } | undefined>("kv", "readonly", (s) => s.get(key));
    return row ? row.value : null;
  } catch {
    return null;
  }
}

export async function kvSet<T>(key: string, value: T) {
  await tx("kv", "readwrite", (s) => s.put({ key, value }));
}

export async function logEvent(type: string, detail: string) {
  try {
    await tx("events", "readwrite", (s) => s.add({ type, detail, at: new Date().toISOString() }));
  } catch {}
}

/* ——— Password storage ———
 * v2: PBKDF2-SHA256, 150k iterations, per-user 128-bit random salt.
 * (v1 was a single SHA-256 with a fixed pepper — GPU-crackable in seconds. Accounts
 * created under v1 are verified against the legacy digest and transparently re-hashed
 * to v2 on their next successful login, so nobody is locked out.)
 * Threat model: this is a *device-local* profile lock (IndexedDB, no server, no
 * transmitted secrets), but the same hygiene rules apply as anywhere else.
 */
const KDF_ITER = 150_000;

function toHex(data: ArrayBuffer | Uint8Array): string {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

async function pbkdf2(password: string, salt: Uint8Array, iterations: number): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password) as BufferSource,
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  // `as BufferSource`: TS lib.dom types WebCrypto views as ArrayBuffer-backed; our salt is a
  // plain Uint8Array over a fresh ArrayBuffer — the cast only silences the variance mismatch.
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return toHex(bits);
}

async function legacyHash(password: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`pth-pk|${password}`) as BufferSource);
  return toHex(buf);
}

/** Returns a self-describing digest: `v2$<iterations>$<saltHex>$<hashHex>`. */
export async function hashPass(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, KDF_ITER);
  return `v2$${KDF_ITER}$${toHex(salt)}$${hash}`;
}

/** Constant-time-ish hex compare + legacy (v1) transparent-upgrade path. */
export async function verifyPass(password: string, stored: string): Promise<{ ok: boolean; upgraded?: string }> {
  if (stored.startsWith("v2$")) {
    const [, iter, saltHex, hash] = stored.split("$");
    const check = await pbkdf2(password, fromHex(saltHex), Number(iter) || KDF_ITER);
    let diff = check.length ^ hash.length;
    for (let i = 0; i < Math.min(check.length, hash.length); i++) diff |= check.charCodeAt(i) ^ hash.charCodeAt(i);
    return { ok: diff === 0 };
  }
  // v1 record: verify with the legacy digest, then re-hash so it never gets checked raw again.
  const legacy = await legacyHash(password);
  if (legacy === stored) return { ok: true, upgraded: await hashPass(password) };
  return { ok: false };
}

export async function findUserByEmail(email: string): Promise<LocalUser | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const t = db.transaction("users", "readonly");
    const idx = t.objectStore("users").index("email");
    const req = idx.get(email.trim().toLowerCase());
    req.onsuccess = () => resolve((req.result as LocalUser) ?? null);
    req.onerror = () => reject(req.error);
  });
}

export async function createUser(name: string, email: string, password: string): Promise<LocalUser> {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("An account with this email already exists on this device.");
  const now = new Date().toISOString();
  const user: LocalUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passHash: await hashPass(password),
    createdAt: now,
    lastLogin: now,
  };
  await tx("users", "readwrite", (s) => s.add(user));
  await logEvent("signup", user.email);
  return user;
}

export async function authUser(email: string, password: string): Promise<LocalUser> {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("No account on this device for that email. Create one.");
  const { ok, upgraded } = await verifyPass(password, user.passHash);
  if (!ok) throw new Error("Wrong password.");
  const next = { ...user, lastLogin: new Date().toISOString(), passHash: upgraded ?? user.passHash };
  await tx("users", "readwrite", (s) => s.put(next));
  await logEvent("login", user.email);
  return next;
}

export async function countUsers() {
  try {
    return await tx<number>("users", "readonly", (s) => s.count());
  } catch {
    return 0;
  }
}
