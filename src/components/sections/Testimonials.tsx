import NoiseOverlay from "@/components/NoiseOverlay";
import Reveal from "@/components/Reveal";

const QUOTES = [
  {
    quote:
      "NexBrave didn't just redesign our site — they rebuilt how people feel about our brand.",
    name: "Amara Chen",
    role: "CEO, Orbit Finance",
    initials: "AC",
    rating: 4.9,
  },
  {
    quote:
      "Fastest, most opinionated team we've worked with. They pushed back on our bad ideas and we're better for it.",
    name: "Daniel Okafor",
    role: "Founder, Haven Living",
    initials: "DO",
    rating: 5.0,
  },
  {
    quote:
      "The app shipped two weeks early and still hit every milestone. The numbers say the rest.",
    name: "Priya Nair",
    role: "Head of Product, Pulse Fit",
    initials: "PN",
    rating: 4.8,
  },
  {
    quote:
      "Every dollar we put into paid media finally felt accountable. NexBrave treats budget like it's their own.",
    name: "Renee Ford",
    role: "VP Marketing, North & Co.",
    initials: "RF",
    rating: 4.9,
  },
  {
    quote:
      "Our SEO traffic tripled. More importantly, it's traffic that actually converts. They get both the craft and the numbers.",
    name: "Marcus Webb",
    role: "CMO, Kiln Studio",
    initials: "MW",
    rating: 5.0,
  },
  {
    quote:
      "They cut our launch film like they had something to prove. Every version tested better than the last.",
    name: "Theo Marsh",
    role: "Creative Director, Voxel Media",
    initials: "TM",
    rating: 4.8,
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={`h-3.5 w-3.5 shrink-0 ${filled ? "text-amber-400" : "text-white/15"}`}
    >
      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.9l-5.2 2.62.99-5.8-4.21-4.1 5.82-.85z" />
    </svg>
  );
}

function ReviewCard({ q }: { q: (typeof QUOTES)[number] }) {
  return (
    <div className="w-[320px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:w-[360px]">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-grad-blue text-sm font-medium text-white">
          {q.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{q.name}</p>
          <p className="truncate text-xs text-white/50">{q.role}</p>
        </div>
      </div>

      <div className="my-4 h-px bg-white/10" />

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white/80">{q.rating.toFixed(1)}</span>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < Math.round(q.rating)} />
          ))}
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/60">{q.quote}</p>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof QUOTES; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="group overflow-hidden">
      <div
        className="flex w-max animate-marquee-slow gap-6 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {loop.map((q, i) => (
          <ReviewCard key={i} q={q} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#0A0E14] py-28 text-white sm:py-36">
      <NoiseOverlay />
      <div className="mx-auto mb-14 max-w-[1400px] px-6 sm:px-10">
        <Reveal className="text-center">
          <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-gray-soft">
            What clients say
          </span>
          <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Don&rsquo;t take <span className="text-gradient-blue">our</span> word for it
          </h2>
        </Reveal>
      </div>

      <div className="relative flex flex-col gap-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0A0E14] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0A0E14] to-transparent sm:w-32" />
        <MarqueeRow items={QUOTES} />
        <MarqueeRow items={QUOTES} reverse />
      </div>
    </section>
  );
}
