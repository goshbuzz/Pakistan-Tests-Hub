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

export async function hashPass(password: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`pth-pk|${password}`));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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
  const hash = await hashPass(password);
  if (hash !== user.passHash) throw new Error("Wrong password.");
  const next = { ...user, lastLogin: new Date().toISOString() };
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
