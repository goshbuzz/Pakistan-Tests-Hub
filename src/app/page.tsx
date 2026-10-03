import type { Metadata } from "next";
import Link from "next/link";
import { ALL_ALERTS } from "@/data/coverage";
import { JOBS } from "@/data/jobs";
import { CATEGORY_META, TESTS } from "@/data/tests";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { CookieBar } from "@/components/CookieBar";
import { InstallPrompt } from "@/components/InstallPrompt";
import { LOGO_HEIGHT, LOGO_SRC, LOGO_WIDTH } from "@/lib/brand";
import { PARENT_ORG_URL, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

/**
 * Marketing homepage — a pure, fully server-rendered website page.
 * It carries NO app state (no useStore / localStorage), so Googlebot and answer
 * engines get complete content on the first byte. The interactive hub itself lives
 * at /start (noindex) and is reached only through the CTAs below.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Pakistan Tests Hub — Free MDCAT, CSS, PPSC, NTS & Govt Job Test Prep 2026",
  },
  description:
    "Pakistan Tests Hub by GoshBuzz: free self-study for 100 Pakistani exams — MDCAT, ECAT, CSS, PMS, PPSC, FPSC, NTS, ISSB, bank MTO, police, IELTS & German. Syllabus checklists, original MCQ banks, 10 timed mocks per test, live job listings and official apply links. No academy fee, no leaked papers.",
  keywords: [
    "Pakistan tests hub",
    "free mock tests Pakistan",
    "MDCAT preparation 2026",
    "CSS preparation Pakistan",
    "PPSC one paper test",
    "NTS GAT",
    "FPSC jobs 2026",
    "government jobs Pakistan",
    "IELTS practice Pakistan",
    "ISSB test preparation",
  ],
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title: "Pakistan Tests Hub — 100 free Pakistan test prep & government job guides",
    description: SITE_TAGLINE,
    images: [{ url: LOGO_SRC, width: LOGO_WIDTH, height: LOGO_HEIGHT, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakistan Tests Hub — free MDCAT, CSS, PPSC, NTS, IELTS prep",
    description: SITE_TAGLINE,
  },
};

/** Home-page FAQ copy. Deliberately different wording/questions than /faq so the
 *  two pages never compete as duplicate content in Google. */
const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "What is Pakistan Tests Hub?",
    a: "A free study website by GoshBuzz for Pakistani students, fresh graduates and job seekers. It collects every major test — MDCAT, ECAT, CSS, PMS, PPSC, FPSC, NTS, ISSB, police, educators, bank MTO, ACCA, IELTS, German — in one hub with syllabus checklists, original MCQ banks, timed mocks and official apply links.",
  },
  {
    q: "Is it really free, or is there a hidden fee?",
    a: "Everything on the site is free: no academy charge, no subscription, no paid unlock. The only money you ever pay is the real exam or challan fee — on the official FPSC, PPSC, NTS or university portal, never here.",
  },
  {
    q: "Do you host leaked past papers or answer keys?",
    a: "No. All practice items are original MCQs and mini-papers written to match each exam's last publicly announced pattern. If a real past paper is official and public, we link to the conducting body's own page instead of copying it.",
  },
  {
    q: "Do I need an account to practise?",
    a: "No. You can open the hub as a guest — saved tests, streaks, points and mock scores stay on your own device, in your browser. An optional local account just lets you separate profiles on the same phone.",
  },
  {
    q: "Where do I actually submit my application?",
    a: "Only on the official site of the conducting body (fpsc.gov.pk, ppsc.gop.pk, nts.org.pk, punjabpolice.gov.pk, and similar). Every test and job card on Pakistan Tests Hub deep-links straight to that official page — the hub never takes applications.",
  },
  {
    q: "Can I install it and use it offline?",
    a: "Yes. On Android Chrome tap menu → “Install app”, or on iPhone Safari → Share → Add to Home Screen. Saved syllabus ticks and practice history keep working with no signal, useful for commutes and load-shedding hours.",
  },
];

const STATS = [
  { value: `${TESTS.length}`, label: "tests covered" },
  { value: `${CATEGORY_META.length}`, label: "exam categories" },
  { value: "10", label: "timed mocks per test" },
  { value: "PKR 0", label: "forever — no academy fee" },
];

const FEATURES = [
  {
    icon: "📚",
    title: "Syllabus ticklists, per exam",
    text: "Every test page starts with the last publicly announced syllabus broken into tickable topics — track exactly what you have and haven't revised.",
  },
  {
    icon: "✍️",
    title: "Original MCQ banks",
    text: "Drill free MCQs written to mirror each paper's real subject mix — no negative-marking surprises, no recycled academy PDFs.",
  },
  {
    icon: "⏱️",
    title: "10 timed mocks in the real mix",
    text: "Sit mini-papers shaped like the actual test (MDCAT's Bio–Chem–Phy split, PPSC's one-paper blend, IELTS four modules) with a countdown and score at the end.",
  },
  {
    icon: "💼",
    title: "Government job listings",
    text: "FPSC, PPSC, NTS, PTS, police, educators and bank ads, each with eligibility, fee, last date and a direct link to the official apply page.",
  },
  {
    icon: "🔔",
    title: "Exam alerts that matter",
    text: "Admit-card, result and date-change notices for the tests you follow — written the way the conducting body published them.",
  },
  {
    icon: "📱",
    title: "Installable, offline-friendly",
    text: "Add it to your home screen. Progress lives on your device — private by design, still working when the network isn't.",
  },
];

export default function HomePage() {
  const popular = TESTS.filter((t) => t.priority).slice(0, 6);
  const latestAlerts = [...ALL_ALERTS]
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .slice(0, 3);
  const latestJobs = JOBS.slice(0, 3);

  const homeLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: `${SITE_NAME} — free Pakistan test prep & government job hub`,
      description: SITE_TAGLINE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@type": "Thing", name: "Pakistan exam preparation and government jobs" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: HOME_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Popular tests on Pakistan Tests Hub",
      itemListElement: popular.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Course",
          name: `${t.name} preparation`,
          url: `${SITE_URL}/tests/${t.id}`,
          description: t.format_description,
          provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f3e9] text-stone-900">
      <JsonLd data={homeLd} />

      {/* ————— Site header (marketing nav, not the app shell) ————— */}
      <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE_NAME} home`}>
            <Logo size={38} />
            <span className="leading-tight">
              <span className="block text-[15px] font-bold tracking-tight text-[#01411C]">Pakistan Tests Hub</span>
              <span className="block text-[10px] font-medium uppercase tracking-widest text-stone-500">
                a {""}
                <a href={PARENT_ORG_URL} className="underline decoration-emerald-700/40" rel="noopener noreferrer">
                  GoshBuzz
                </a>{" "}
                project
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex" aria-label="Main">
            <Link href="/explore" className="hover:text-[#01411C]">
              All tests
            </Link>
            <Link href="/jobs" className="hover:text-[#01411C]">
              Govt jobs
            </Link>
            <Link href="/alerts" className="hover:text-[#01411C]">
              Alerts
            </Link>
            <Link href="/faq" className="hover:text-[#01411C]">
              FAQ
            </Link>
          </nav>
          <Link
            href="/start"
            className="rounded-full bg-[#01411C] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#046a32]"
          >
            Open the hub
          </Link>
        </div>
      </header>

      <main>
        {/* ————— Hero ————— */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#01411C] via-[#046a32] to-[#0a7a3e] text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, rgba(197,164,78,.55) 0, transparent 30%), radial-gradient(circle at 85% 75%, rgba(255,255,255,.35) 0, transparent 35%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_.85fr] lg:pb-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-50 ring-1 ring-white/20">
                🇵🇰 For students, fresh graduates &amp; job seekers
              </p>
              <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Every major Pakistan test. <span className="text-[#ffd97a]">One free hub.</span>
              </h1>
              <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-emerald-50/95 sm:text-lg">
                MDCAT, CSS, PMS, PPSC, FPSC, NTS, ISSB, police, educators, bank MTO, IELTS &amp; German — real
                syllabi, original MCQ banks and 10 timed mocks per test, each with the official apply link.
                No academy fee. No leaked papers. Ever.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/start"
                  className="group rounded-full bg-[#C5A44E] px-6 py-3 text-base font-bold text-[#01411C] shadow-lg shadow-black/20 transition hover:bg-[#d5b763]"
                >
                  Open the free test hub{" "}
                  <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
                <Link
                  href="/explore"
                  className="rounded-full border border-white/35 px-6 py-3 text-base font-semibold text-white/95 transition hover:bg-white/10"
                >
                  Browse {TESTS.length} tests
                </Link>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-emerald-50/90">
                <li>✔ Guest mode — no sign-up needed</li>
                <li>✔ Installable app, works offline</li>
                <li>✔ Apply only via official sites</li>
              </ul>
            </div>

            {/* Static "app preview" card — pure website décor, no app state */}
            <div className="relative mx-auto w-full max-w-sm" aria-hidden>
              <div className="absolute -inset-4 rounded-[2.5rem] bg-white/10 blur-2xl" />
              <div className="relative rounded-3xl border border-white/20 bg-white p-4 text-stone-900 shadow-2xl">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                  <span>Today on the hub</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-800">Free</span>
                </div>
                <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#01411C] to-[#0a7a3e] p-4 text-white">
                  <p className="text-xs text-emerald-100">Mock in progress · MDCAT</p>
                  <p className="mt-1 text-2xl font-bold">Q 42 / 100</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/25">
                    <div className="h-full w-[42%] rounded-full bg-[#C5A44E]" />
                  </div>
                  <p className="mt-2 text-[11px] text-emerald-50">⏱ 1:48:12 left · streak day 12 🔥</p>
                </div>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center justify-between rounded-xl border border-stone-200 px-3 py-2">
                    <span className="font-medium">PPSC one-paper MCQs</span>
                    <span className="text-xs text-emerald-700">412 free →</span>
                  </li>
                  <li className="flex items-center justify-between rounded-xl border border-stone-200 px-3 py-2">
                    <span className="font-medium">CSS MPT — current affairs</span>
                    <span className="text-xs text-emerald-700">daily set →</span>
                  </li>
                  <li className="flex items-center justify-between rounded-xl border border-stone-200 px-3 py-2">
                    <span className="font-medium">NTS GAT General mock 03</span>
                    <span className="text-xs text-emerald-700">2 hrs →</span>
                  </li>
                </ul>
                <p className="mt-3 text-center text-[11px] text-stone-400">Preview — this is exactly what opens at “Open the hub”.</p>
              </div>
            </div>
          </div>

          {/* stats band */}
          <div className="relative border-t border-white/15 bg-black/10">
            <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-4 px-4 py-6 text-center sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="order-2 text-xs font-medium uppercase tracking-wide text-emerald-100/80">{s.label}</dt>
                  <dd className="text-2xl font-bold text-white sm:text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ————— Categories ————— */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16" aria-labelledby="cats-h">
          <h2 id="cats-h" className="text-center text-balance text-3xl font-bold tracking-tight text-[#01411C]">
            Pick your lane — {CATEGORY_META.length} categories, {TESTS.length} tests
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-stone-600">
            From FSc admissions to one-paper recruitment, licensing and immigration exams. Each opens a full prep
            page: syllabus, MCQ bank, mocks, jobs, alerts and the official apply link.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORY_META.map((c) => {
              const n = TESTS.filter((x) => x.category === c.key).length;
              return (
                <Link
                  key={c.key}
                  href={`/explore?cat=${encodeURIComponent(c.key)}`}
                  className="group rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-700/40 hover:shadow-md"
                >
                  <div className="text-2xl">{c.icon}</div>
                  <div className="mt-2 font-semibold text-stone-900 group-hover:text-[#01411C]">{c.label}</div>
                  <div className="mt-0.5 text-xs text-stone-500">{n} tests · free</div>
                </Link>
              );
            })}
            <Link
              href="/explore"
              className="flex flex-col justify-center rounded-2xl border border-dashed border-emerald-800/40 bg-emerald-50/60 p-4 text-center transition hover:bg-emerald-50"
            >
              <span className="font-semibold text-[#01411C]">See everything</span>
              <span className="mt-0.5 text-xs text-emerald-900/70">Filter by stage &amp; body →</span>
            </Link>
          </div>
        </section>

        {/* ————— What you get ————— */}
        <section className="border-y border-stone-200/70 bg-white" aria-labelledby="feat-h">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
            <h2 id="feat-h" className="text-center text-balance text-3xl font-bold tracking-tight text-[#01411C]">
              What you get inside the hub
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-stone-600">
              Built like an app, published like a website — everything below works free, in the browser, on any phone.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <article key={f.title} className="rounded-2xl border border-stone-200 bg-[#fbfaf5] p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-900/5 text-2xl">{f.icon}</div>
                  <h3 className="mt-3 font-semibold text-stone-900">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ————— Trending tests ————— */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16" aria-labelledby="pop-h">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="pop-h" className="text-balance text-3xl font-bold tracking-tight text-[#01411C]">
                Trending this season
              </h2>
              <p className="mt-1 text-sm text-stone-600">The tests Pakistanis are drilling the most right now.</p>
            </div>
            <Link href="/explore" className="text-sm font-semibold text-emerald-800 hover:underline">
              View all {TESTS.length} →
            </Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((test) => (
              <Link
                key={test.id}
                href={`/tests/${test.id}`}
                className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-700/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                    {test.category}
                  </span>
                  <span className="text-xs text-stone-400 group-hover:text-emerald-700">Prep page →</span>
                </div>
                <h3 className="mt-2.5 text-lg font-semibold text-stone-900 group-hover:text-[#01411C]">{test.name}</h3>
                <p className="mt-1 text-xs text-stone-500">{test.conducting_body}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600">{test.format_description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ————— How it works ————— */}
        <section className="bg-gradient-to-b from-[#01411C] to-[#046a32] text-white" aria-labelledby="how-h">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
            <h2 id="how-h" className="text-center text-balance text-3xl font-bold tracking-tight">
              Free prep in three steps
            </h2>
            <ol className="mx-auto mt-9 grid max-w-5xl gap-4 sm:grid-cols-3">
              {[
                {
                  n: "1",
                  t: "Open the hub",
                  d: "No paywall, no mandatory signup. Guest mode keeps everything on your device.",
                },
                {
                  n: "2",
                  t: "Pick your test",
                  d: "Tick the syllabus, drill MCQs, sit timed mocks shaped like the real paper. Track streaks and points.",
                },
                {
                  n: "3",
                  t: "Apply officially",
                  d: "Job & exam cards deep-link to fpsc.gov.pk, ppsc.gop.pk, nts.org.pk and other verified sources.",
                },
              ].map((s) => (
                <li key={s.n} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#C5A44E] text-sm font-bold text-[#01411C]">
                    {s.n}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-emerald-50/90">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ————— Jobs + Alerts teasers ————— */}
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-16 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-[#01411C]">💼 Latest government job ads</h2>
              <Link href="/jobs" className="text-sm font-semibold text-emerald-800 hover:underline">
                All jobs →
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {latestJobs.map((j) => (
                <li key={j.id} className="rounded-2xl border border-stone-200 bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                    {j.organization} · {j.location}
                  </p>
                  <p className="mt-1 font-semibold leading-snug text-stone-900">{j.title}</p>
                  <p className="mt-1 text-xs text-stone-500">Last date: {j.last_date}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-[#01411C]">🔔 Fresh exam alerts</h2>
              <Link href="/alerts" className="text-sm font-semibold text-emerald-800 hover:underline">
                All alerts →
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {latestAlerts.map((a) => {
                const test = TESTS.find((x) => x.id === a.test_id);
                return (
                  <li key={a.id} className="rounded-2xl border border-stone-200 bg-white p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                      {test?.name ?? "General"} · {a.published_at.slice(0, 10)}
                    </p>
                    <p className="mt-1 font-semibold leading-snug text-stone-900">{a.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-stone-600">{a.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ————— FAQ ————— */}
        <section className="border-t border-stone-200/70 bg-white" aria-labelledby="faq-h">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:py-16">
            <h2 id="faq-h" className="text-center text-balance text-3xl font-bold tracking-tight text-[#01411C]">
              Questions before you open the hub
            </h2>
            <dl className="mt-8 space-y-5">
              {HOME_FAQS.map((f) => (
                <div key={f.q} className="rounded-2xl border border-stone-200 bg-[#fbfaf5] p-5">
                  <dt className="font-semibold text-stone-900">{f.q}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-stone-600">{f.a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-center text-sm text-stone-500">
              More detail for job seekers and graduates in the{" "}
              <Link href="/faq" className="font-semibold text-emerald-800 underline">
                full FAQ
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ————— Final CTA band ————— */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#01411C] via-[#046a32] to-[#0a8f44] px-6 py-10 text-center text-white shadow-xl sm:px-12">
            <h2 className="text-balance text-3xl font-bold tracking-tight">Your next test starts today.</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-emerald-50/95 sm:text-base">
              Open the free hub, pick your exam, tick your first syllabus topic. Guest mode included — nothing to buy.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/start"
                className="rounded-full bg-[#C5A44E] px-7 py-3 text-base font-bold text-[#01411C] shadow transition hover:bg-[#d5b763]"
              >
                Open the free test hub →
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/40 px-7 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Sign in / create account
              </Link>
            </div>
            <p className="mt-4 text-[11px] text-emerald-100/70">
              Unofficial study aid — always apply on the official conducting-body website.
            </p>
          </div>
        </section>
      </main>

      {/* ————— Site footer ————— */}
      <footer className="border-t border-stone-200 bg-[#01411C] text-emerald-50/85">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={34} />
              <span className="font-bold text-white">Pakistan Tests Hub</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed">
              A {""}
              <a href={PARENT_ORG_URL} className="font-semibold text-white underline" rel="noopener noreferrer">
                GoshBuzz
              </a>{" "}
              project. Free self-study for {TESTS.length} Pakistani exams — original MCQs, timed mocks, official
              apply links. Not affiliated with FPSC, PPSC, NTS or any board.
            </p>
          </div>
          <nav aria-label="Prep">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-200/70">Prep</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/explore" className="hover:text-white">
                  All tests
                </Link>
              </li>
              <li>
                <Link href="/start" className="hover:text-white">
                  Open the hub
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-white">
                  Government jobs
                </Link>
              </li>
              <li>
                <Link href="/alerts" className="hover:text-white">
                  Exam alerts
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Popular">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-200/70">Popular tests</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {popular.slice(0, 4).map((t) => (
                <li key={t.id}>
                  <Link href={`/tests/${t.id}`} className="hover:text-white">
                    {t.name} in Pakistan
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-200/70">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-emerald-100/60">
          © {new Date().getFullYear()} {SITE_NAME} · Published by GoshBuzz · goshbuzz.com
        </div>
      </footer>

      <InstallPrompt />
      <CookieBar />
    </div>
  );
}
