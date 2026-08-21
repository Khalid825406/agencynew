import Image from "next/image";
import Link from "next/link";
import ServiceIcon from "@/components/graphics/ServiceIcon";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/data";

// seo.png and videoediting.png have their own title text baked into the
// left third of the image — cropping toward the right side keeps just the
// device/graphic, so it doesn't duplicate this card's own heading.
const SERVICE_IMAGES: Record<string, { src: string; position?: string }> = {
  "web-development": { src: "/webdeveloper.png" },
  "app-development": { src: "/app.png" },
  "digital-marketing": { src: "/digitalmarketing.png" },
  "seo-services": { src: "/seo.png", position: "75% center" },
  "video-editing": { src: "/videoediting.png", position: "75% center" },
};

export default function Services() {
  return (
    <section id="services" className="relative bg-[#0A0E14] py-28 text-white sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="mb-16 max-w-xl">
          <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-gray-soft">
            What we do
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight">
            Five disciplines. <span className="text-gradient-blue">One team.</span>
          </h2>
        </Reveal>
      </div>

      {/* Each card is `position: sticky` with a slightly larger `top` offset
          than the one before it — pure CSS, no scroll-progress JS. As you
          scroll, a card sticks near the top, the next one slides up from
          below and covers most of it (leaving a thin sliver of the
          previous card peeking above, from the top-offset difference), then
          takes over as the new sticky card itself. */}
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        {SERVICES.map((s, i) => {
          const image = SERVICE_IMAGES[s.slug];
          return (
            <div key={s.slug} className="sticky mb-8" style={{ top: `${96 + i * 20}px` }}>
              <div
                className={`grid grid-cols-1 gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-14 ${s.gradient}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    style={image.position ? { objectPosition: image.position } : undefined}
                    className="object-cover"
                  />
                </div>

                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                    <ServiceIcon slug={s.slug} className="h-5 w-5 text-white" />
                  </span>
                  <span className="mt-6 block font-mono text-xs text-white/70">
                    {s.n} / 05
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                    {s.name}
                  </h3>
                  <p className="mt-3 max-w-md text-white/85">{s.long}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/services#${s.slug}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0A0E14] px-6 py-3 text-sm font-medium uppercase tracking-[0.1em] text-white transition-transform duration-300 hover:scale-105"
                  >
                    Explore service <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
