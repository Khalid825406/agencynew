import KineticText from "@/components/KineticText";
import NoiseOverlay from "@/components/NoiseOverlay";

export default function PageHero({
  eyebrow,
  title,
  gradientWords = [],
  description,
}: {
  eyebrow: string;
  title: string;
  gradientWords?: string[];
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-base-white pb-20 pt-40 sm:pb-28 sm:pt-48 text-charcoal">
      <NoiseOverlay />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-bright/15 blur-[140px]" />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <span className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gray-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-grad-blue" />
          {eyebrow}
        </span>
        <KineticText
          as="h1"
          text={title}
          gradientWords={gradientWords}
          className="font-display text-[11vw] sm:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-tight"
        />
        {description && (
          <p className="mt-8 max-w-lg text-base sm:text-lg text-charcoal/60">{description}</p>
        )}
      </div>
    </section>
  );
}
