"use client";

import { useState, type FormEvent, type ReactNode } from "react";
const hero = "/assets/hero.jpg";
const stationery = "/assets/stationery-collage.png";
const penpal = "/assets/penpal.jpg";
const feltStar = "/assets/felt-star.webp";
import { signupSchema, submitSignup } from "@/lib/signup";
import { SignupSuccess, SocialLinks } from "@/components/signup-success";

function Star({ className = "", fabric = false }: { className?: string; fabric?: boolean }) {
  if (!fabric) {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
        <path d="M50 4 L61 37 L96 38 L68 59 L78 94 L50 73 L22 94 L32 59 L4 38 L39 37 Z" className="fill-gold stroke-paper" strokeWidth="5" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <img src={feltStar} alt="" aria-hidden="true" width={256} height={256} className={`object-contain ${className}`} />
  );
}

type TapePattern = "rose-dots" | "green-dots" | "blue-checks" | "gold-stripes" | "lilac-checks";

function Tape({ className = "", pattern = "rose-dots" }: { className?: string; pattern?: TapePattern }) {
  return <span aria-hidden="true" className={`decorative-tape tape-${pattern} pointer-events-none absolute z-10 h-10 w-28 ${className}`} />;
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

export default function Home() {
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
        <Eyebrow>Snail mail & lovely little finds</Eyebrow>
        <h1 className="mt-5 text-5xl leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
          Once upon a time, people wrote <em className="text-cherry">letters</em>.
          <br />
          <span className="mt-3 block font-display text-4xl italic text-cornflower sm:text-5xl lg:text-6xl">Let's begin again.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
          Little Red Writing Hood is my little corner for snail mail, lovely finds and the joy of putting
          pen to paper. I share the post I receive, letters I send, unboxings and things I couldn't leave behind.
        </p>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
          Now I'm exploring a stationery collection of my own. Paper is the starting point, with room
          for other lovely things along the way.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a
            href="#signup"
            className="inline-flex items-center gap-2 rounded-sm bg-cherry px-7 py-4 font-type text-sm uppercase tracking-widest text-primary-foreground shadow-[4px_4px_0_var(--wine)] transition-transform hover:-translate-y-0.5"
          >
            Join the First Chapter
          </a>
          <span className="font-body text-sm text-forest">Sign up for future email updates.</span>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-sm">
        <Star fabric className="animate-star absolute -left-8 -top-8 z-10 h-20 w-20" />
        <div className="relative rotate-2 bg-paper p-3 pb-6 shadow-[var(--shadow-paper)]">
          <Tape pattern="green-dots" className="-top-5 left-1/2 -translate-x-1/2 -rotate-3" />
          <img src={hero} alt="Portrait of the founder in a red headscarf holding a book of Grimm fairytales" width={1200} height={1800} className="aspect-[4/5] w-full object-cover" />
          <Tape pattern="blue-checks" className="-bottom-4 -right-5 -rotate-12" />
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
          mailbox. We want to make things that pull you away from the screen to write, stick, draw and
          send something real to someone.
        </p>
        <p className="mt-6 font-display text-xl italic text-gold sm:text-2xl">It's taking shape, and I'd love to hear what you think.</p>
      </div>
    </section>
  );
}

const products = [
  { name: "Stickers", note: "keys, candles & storybook charms", tape: "rose-dots" },
  { name: "Washi tape", note: "flowers, leaves & candle motifs", tape: "blue-checks" },
  { name: "Letter paper", note: "delicate borders & floral details", tape: "gold-stripes" },
  { name: "Envelopes", note: "a little colour for your next letter", tape: "lilac-checks" },
] satisfies { name: string; note: string; tape: TapePattern }[];

function Products() {
  return (
    <section id="collection" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-20 sm:py-24">
      <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div>
          <Eyebrow>In the making</Eyebrow>
          <h2 className="mt-4 text-4xl text-ink sm:text-5xl">The first stationery collection</h2>
          <Flourish className="mt-4 h-5 w-32" />
          <p className="mt-4 text-muted-foreground">
            A first look at the ideas I'm exploring. Nothing is for sale just yet. Tell me what you'd love to see first.
          </p>
        </div>
        <figure className="relative isolate py-6">
          <div aria-hidden="true" className="absolute inset-x-5 inset-y-8 -z-10 rotate-6 rounded-[48%] bg-gold/10" />
          <img src={stationery} alt="Floral letter paper, open envelopes, vintage postcards, washi tape and illustrated stickers arranged in a loose collage" width={1536} height={1024} loading="lazy" className="w-full -rotate-2" />
          <figcaption className="mt-5 text-center font-display text-xl italic text-cherry sm:text-2xl">
            For your desk, your journal and your next letter.
          </figcaption>
        </figure>
      </div>
      <ul className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {products.map((p, i) => (
          <li key={p.name} className={`paper-card relative p-5 pt-10 ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
            <Tape pattern={p.tape} className={`-top-5 left-3 ${i % 2 ? "rotate-3" : "-rotate-3"}`} />
            <p className="font-type text-[11px] text-muted-foreground">No. 0{i + 1}</p>
            <h3 className="mt-1 text-2xl text-ink">{p.name}</h3>
            <p className="mt-2 font-body text-base leading-relaxed text-cocoa">{p.note}</p>
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
          <img src={penpal} alt="The founder lying among postcards and letters, holding a letter in front of her face" width={1400} height={933} loading="lazy" className="w-full rotate-1 border-8 border-paper" />
          <Star className="absolute right-3 -top-5 h-16 w-16" />
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
          <div className="notebook-note mt-8">
            <aside className="notebook-paper" aria-label="A personal note">
              <p className="font-display text-lg text-cherry">Why I'd love to try this</p>
              <p className="mt-7 font-body text-base">
                I've tried a few pen pal websites, but I've never quite found one that works the way I'd like.
                That's what made me want to explore a different approach: helping people find a pen pal
                they really click with. I'd love to hear what would make that easier for you, too.
              </p>
            </aside>
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
  const submit = submitSignup;
  const [interest, setInterest] = useState<Interest | null>(null);
  const [productsSel, setProductsSel] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<"interest" | "first_name" | "email" | "age_range" | "country", string>>>({});
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
      setErrors(errs as typeof errors);
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
          Help me shape what comes next, starting with stationery and a possible pen pal matching service.
          Leave your email for occasional updates when there's something to share.
        </p>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          In the meantime, you'll find my mail, unboxings and favourite finds on Instagram and TikTok.
        </p>
        <SocialLinks className="mt-5 text-cherry" />
      </div>

      <div className="paper-card relative mt-12 p-6 sm:p-10">
        <Tape pattern="gold-stripes" className="-top-5 left-8 -rotate-6" />
        <Star className="absolute right-3 -top-6 h-14 w-14" />
        {status === "done" ? (
          <SignupSuccess firstName={firstName} />
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-10">
            <fieldset>
              <legend className="font-display text-2xl text-ink">What are you most interested in?</legend>
              <p className="mt-3 text-muted-foreground">Please help me out and let me know what you'd most like to see.</p>
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
                  className="ruled mt-3 w-full resize-none border-0 bg-transparent font-body text-base leading-7 text-ink focus:outline-none"
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
                By joining, you agree to receive occasional emails about Little Red Writing Hood.
                You can unsubscribe at any time. I'll start sending updates when there's news to share.
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-sm bg-cherry px-7 py-4 font-type text-sm uppercase tracking-widest text-primary-foreground shadow-[4px_4px_0_var(--wine)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "sending" ? "Signing you up…" : "Join the First Chapter"}
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

function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
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
      <p className="mt-3 font-display text-lg italic text-gold">A little more paper, a little more joy.</p>
      <SocialLinks className="mt-6" />
      <p className="mt-3 font-body text-sm opacity-85">@littleredwritinghooddd</p>
    </footer>
  );
}
