import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent, type ReactNode } from "react";
import hero from "@/assets/hero.jpg";
import stationery from "@/assets/stationery.jpg";
import penpal from "@/assets/penpal.jpg";
import { signupSchema, submitSignup } from "@/lib/signup.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Little Red Writing Hood — Join the First Chapter" },
      {
        name: "description",
        content:
          "Fairytale stationery and a future pen-pal matching idea for people who love snail mail. Sign up for early access.",
      },
      { property: "og:title", content: "Little Red Writing Hood — Join the First Chapter" },
      {
        property: "og:description",
        content: "Stickers, washi tape, letter paper, envelopes — and new ways to connect through letters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path
        d="M50 4 L61 37 L96 38 L68 59 L78 94 L50 73 L22 94 L32 59 L4 38 L39 37 Z"
        className="fill-gold stroke-paper"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 20" className={className} aria-hidden>
      <path d="M2 10 C 30 0, 40 20, 60 10 S 90 0, 118 10" className="stroke-cherry" fill="none" strokeWidth="1.5" />
      <circle cx="60" cy="10" r="3" className="fill-cherry" />
    </svg>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-type text-xs uppercase tracking-[0.25em] text-cherry">{children}</p>;
}

function Index() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <World />
      <Products />
      <PenPal />
      <Signup />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
      <a href="#" className="font-display text-lg italic text-wine">
        Little Red <span className="text-cherry">Writing</span> Hood
      </a>
      <a href="#signup" className="font-type text-xs uppercase tracking-widest text-ink underline decoration-cherry decoration-2 underline-offset-4">
        Early access
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-6 md:grid-cols-[1.1fr_0.9fr] md:pt-12">
      <div className="relative">
        <Eyebrow>A stationery story · Chapter one</Eyebrow>
        <h1 className="mt-5 text-5xl leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
          Once upon a time, people wrote <em className="text-cherry">letters</em>.
          <br />
          <span className="font-hand text-6xl text-cornflower sm:text-7xl lg:text-8xl">Let's begin again.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
          Little Red Writing Hood is a small, illustrator-led world of fairytale stationery, snail mail and
          handwritten stories — made for people who still believe in paper.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a
            href="#signup"
            className="inline-flex items-center gap-2 rounded-sm bg-cherry px-7 py-4 font-type text-sm uppercase tracking-widest text-primary-foreground shadow-[4px_4px_0_var(--wine)] transition-transform hover:-translate-y-0.5"
          >
            Join the First Chapter
          </a>
          <span className="font-hand text-2xl text-forest">— free, no strings, just letters</span>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-sm">
        <Star className="animate-star absolute -left-8 -top-8 z-10 h-20 w-20" />
        <div className="relative rotate-2 bg-paper p-3 pb-14 shadow-[var(--shadow-paper)]">
          <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
          <img src={hero} alt="A young woman in a red headscarf writing a letter at a desk" width={1200} height={1504} className="aspect-[4/5] w-full object-cover" />
          <p className="absolute bottom-3 left-4 font-hand text-2xl text-ink">dear you, ♡</p>
        </div>
        <div className="stamp-edge absolute -bottom-6 -right-4 rotate-6 bg-cornflower p-4 text-center text-primary-foreground">
          <p className="font-type text-[10px] uppercase tracking-widest">Par avion</p>
          <p className="font-display text-xl italic">LRWH</p>
        </div>
      </div>
    </section>
  );
}

function World() {
  return (
    <section className="relative bg-wine py-20 text-primary-foreground">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Star className="mx-auto h-10 w-10" />
        <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">
          A little bubble for paper people, <em className="text-rose">dreamers</em> and slow-post romantics.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed opacity-85">
          Inspired by old storybooks, lace, ribbons, pressed flowers and the quiet joy of a letter in the
          mailbox. We want to make things that pull you away from the screen — to write, stick, draw and
          send something real to someone.
        </p>
        <p className="mt-6 font-hand text-3xl text-gold">we're still writing this story — and you can help.</p>
      </div>
    </section>
  );
}

const products = [
  { name: "Stickers", note: "keys, candles & storybook charms", color: "bg-rose" },
  { name: "Washi tape", note: "botanicals, folk tulips, candlelight", color: "bg-sage" },
  { name: "Letter paper", note: "scalloped borders & tiny red flowers", color: "bg-gold" },
  { name: "Envelopes", note: "patterned liners to open slowly", color: "bg-lavender" },
];

function Products() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <Eyebrow>In the making</Eyebrow>
          <h2 className="mt-4 text-4xl text-ink sm:text-5xl">The first stationery collection</h2>
          <Flourish className="mt-4 h-5 w-32" />
          <p className="mt-4 text-muted-foreground">
            Early designs and concepts — not for sale yet. Tell us what you'd love to see first.
          </p>
        </div>
        <div className="relative">
          <img src={stationery} alt="Early concept of the stationery collection: washi tape, letter paper, envelopes and stickers" width={1600} height={1104} loading="lazy" className="w-full -rotate-1 shadow-[var(--shadow-paper)]" />
          <p className="absolute -bottom-5 right-4 bg-paper px-3 py-1 font-type text-xs text-muted-foreground shadow-[var(--shadow-paper)]">
            fig. 1 — concept mock-up
          </p>
        </div>
      </div>
      <ul className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {products.map((p, i) => (
          <li key={p.name} className={`paper-card relative p-5 pt-10 ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
            <span className={`absolute left-5 top-0 h-6 w-14 -translate-y-1/2 ${p.color} opacity-90`} />
            <p className="font-type text-[11px] text-muted-foreground">No. 0{i + 1}</p>
            <h3 className="mt-1 text-2xl text-ink">{p.name}</h3>
            <p className="mt-2 font-hand text-xl leading-tight text-cocoa">{p.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PenPal() {
  const points = [
    ["Interests & hobbies", "books, fantasy, gardening, film photography…"],
    ["Language", "write in your own, or practise a new one"],
    ["Preferences", "age range, country, how many letters a month"],
    ["Writing habits", "long letters, postcards, doodles & zines"],
  ];
  return (
    <section className="bg-navy py-24 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-2 md:items-center">
        <div className="relative order-2 md:order-1">
          <img src={penpal} alt="Handwritten letters and envelopes with stamps from different countries" width={1200} height={1200} loading="lazy" className="w-full rotate-1 border-8 border-paper" />
          <Star className="absolute -right-5 -top-5 h-16 w-16" />
        </div>
        <div className="order-1 md:order-2">
          <p className="font-type text-xs uppercase tracking-[0.25em] text-gold">An idea we're exploring</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Find a pen pal who <em className="text-rose">feels like a kindred spirit</em>.
          </h2>
          <p className="mt-5 leading-relaxed opacity-85">
            We're considering a matching service that introduces you to a compatible pen pal, based on:
          </p>
          <dl className="mt-6 space-y-4">
            {points.map(([t, d]) => (
              <div key={t} className="border-l-2 border-gold pl-4">
                <dt className="font-display text-lg">{t}</dt>
                <dd className="text-sm opacity-75">{d}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 bg-paper p-5 text-ink ruled">
            <p className="font-hand text-2xl leading-7 text-cherry">a small promise:</p>
            <p className="font-type text-sm leading-7">
              AI would only help suggest a match. Everything after that — every word, every envelope — stays
              human, personal and written by hand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type Interest = "stationery" | "pen_pal" | "both";
const productOptions = [
  ["stickers", "Stickers"],
  ["washi_tape", "Washi tape"],
  ["letter_paper", "Letter paper"],
  ["envelopes", "Envelopes"],
] as const;

function Signup() {
  const submit = useServerFn(submitSignup);
  const [interest, setInterest] = useState<Interest | null>(null);
  const [productsSel, setProductsSel] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [firstName, setFirstName] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      first_name: fd.get("first_name"),
      email: fd.get("email"),
      age_range: fd.get("age_range"),
      country: fd.get("country"),
      interest,
      stationery_products: productsSel,
      pen_pal_motivation: (fd.get("pen_pal_motivation") as string) ?? "",
    };
    const parsed = signupSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]);
        if (!errs[k]) errs[k] = k === "interest" ? "Please choose one" : k === "age_range" ? "Please choose an age range" : issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await submit({ data: parsed.data });
      setFirstName(parsed.data.first_name);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const toggleProduct = (v: string) =>
    setProductsSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  const showProducts = interest === "stationery" || interest === "both";
  const showPenPal = interest === "pen_pal" || interest === "both";

  const field = "w-full border-0 border-b-2 border-input bg-transparent px-0 py-2 text-ink placeholder:text-muted-foreground/60 focus:border-cherry focus:outline-none focus:ring-0";

  return (
    <section id="signup" className="mx-auto max-w-3xl scroll-mt-6 px-5 py-24">
      <div className="text-center">
        <Eyebrow>Early access</Eyebrow>
        <h2 className="mt-4 text-5xl text-ink sm:text-6xl">Join the First Chapter</h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Be among the first to discover new stationery, creative experiments and new ways to connect through
          letters.
        </p>
      </div>

      <div className="paper-card relative mt-12 p-6 sm:p-10">
        <span className="tape -top-3 left-8 -rotate-6" />
        <Star className="absolute -right-6 -top-6 h-14 w-14" />
        {status === "done" ? (
          <div className="py-10 text-center">
            <p className="font-hand text-5xl text-cherry">Thank you, {firstName}!</p>
            <p className="mt-4 text-muted-foreground">
              Your name is written in the first chapter. We'll be in touch by email when there's news.
            </p>
            <Flourish className="mx-auto mt-6 h-5 w-32" />
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-10">
            <fieldset>
              <legend className="font-display text-2xl text-ink">What are you most interested in?</legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {(
                  [
                    ["stationery", "Stationery", "bg-rose"],
                    ["pen_pal", "Pen Pal Matching", "bg-cornflower"],
                    ["both", "Both", "bg-gold"],
                  ] as const
                ).map(([v, label, c]) => {
                  const active = interest === v;
                  return (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setInterest(v)}
                      aria-pressed={active}
                      className={`relative border-2 px-4 py-5 text-left transition-all ${active ? "border-cherry bg-background shadow-[4px_4px_0_var(--cherry)]" : "border-input hover:border-cocoa"}`}
                    >
                      <span className={`mb-3 block h-2 w-10 ${c}`} />
                      <span className="font-display text-lg text-ink">{label}</span>
                    </button>
                  );
                })}
              </div>
              {errors.interest && <p className="mt-2 text-sm text-destructive">{errors.interest}</p>}
            </fieldset>

            {showProducts && (
              <fieldset>
                <legend className="font-display text-xl text-ink">Which stationery products interest you most?</legend>
                <div className="mt-4 flex flex-wrap gap-3">
                  {productOptions.map(([v, l]) => {
                    const on = productsSel.includes(v);
                    return (
                      <button
                        type="button"
                        key={v}
                        onClick={() => toggleProduct(v)}
                        aria-pressed={on}
                        className={`rounded-full border-2 px-4 py-2 font-type text-sm transition-colors ${on ? "border-forest bg-forest text-primary-foreground" : "border-input text-ink hover:border-forest"}`}
                      >
                        {on ? "✓ " : ""}{l}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {showPenPal && (
              <div>
                <label htmlFor="pen_pal_motivation" className="font-display text-xl text-ink">
                  What would make you interested in finding a new pen pal?
                </label>
                <textarea
                  id="pen_pal_motivation"
                  name="pen_pal_motivation"
                  rows={4}
                  maxLength={1000}
                  placeholder="e.g. someone who loves fantasy books, practising French…"
                  className="ruled mt-3 w-full resize-none border-0 bg-transparent font-hand text-2xl leading-7 text-ink focus:outline-none"
                />
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="First name" error={errors.first_name}>
                <input name="first_name" maxLength={80} autoComplete="given-name" className={field} />
              </Field>
              <Field label="Email address" error={errors.email}>
                <input name="email" type="email" maxLength={255} autoComplete="email" className={field} />
              </Field>
              <Field label="Age range" error={errors.age_range}>
                <select name="age_range" defaultValue="" className={field}>
                  <option value="" disabled>Choose…</option>
                  <option>18-24</option>
                  <option>25-30</option>
                  <option>31-35</option>
                  <option>36-40</option>
                  <option>40+</option>
                </select>
              </Field>
              <Field label="Country" error={errors.country}>
                <input name="country" maxLength={80} autoComplete="country-name" className={field} />
              </Field>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-xs text-muted-foreground">
                We'll only use your email to share news about Little Red Writing Hood.
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-sm bg-cherry px-7 py-4 font-type text-sm uppercase tracking-widest text-primary-foreground shadow-[4px_4px_0_var(--wine)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "sending" ? "Sealing envelope…" : "Join the First Chapter"}
              </button>
            </div>
            {status === "error" && (
              <p className="text-sm text-destructive">Something went wrong sending your signup. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="font-type text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-destructive">{error}</span>}
    </label>
  );
}

function Footer() {
  return (
    <footer className="bg-forest py-10 text-center text-primary-foreground">
      <p className="font-display text-2xl italic">Little Red Writing Hood</p>
      <p className="mt-2 font-hand text-xl text-gold">liefs, and see you in the mailbox</p>
    </footer>
  );
}
