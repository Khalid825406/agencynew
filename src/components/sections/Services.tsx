import Image from "next/image";
import Link from "next/link";
import ServiceIcon from "@/components/graphics/ServiceIcon";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/data";

// seo.png and videoediting.png have their own title text baked into the
// left third of the image; cropping toward the right side keeps just the
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
    <section
      id="services"
      className="relative bg-[#05070a] py-28 text-white sm:py-36"
    >
      {/* Two big, soft blue blobs on a near-black base: same "aurora glow"
          look as the reference. Clipped in their own overflow-hidden
          wrapper (NOT on the section itself) so they don't break
          `position: sticky` on the cards below. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-20 h-[700px] w-[700px] rounded-full bg-blue-deep/45 blur-[140px]" />
        <div className="absolute -left-32 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-bright/25 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="mb-16 max-w-xl">
          <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-gray-soft">
            What we do
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight">
            Five disciplines. <br/> <span className="text-gradient-blue">One team.</span>
          </h2>
        </Reveal>
      </div>

      {/* Each card is `position: sticky` at the same `top` offset: pure
          CSS, no scroll-progress JS. As you scroll, the current card sticks
          near the top and stays fully hidden underneath as the next card
          rises up from below and completely covers it, then takes over as
          the new sticky card itself. */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10">
        {SERVICES.map((s, i) => {
          const image = SERVICE_IMAGES[s.slug];
          return (
            <div key={s.slug} className="sticky mb-8" style={{ top: "96px", zIndex: i }}>
              {/* Near-opaque glass panel with the reference's own blue glow
                  baked into ITS background (not relying on the section's
                  blobs bleeding through), so every card in the stack looks
                  identical to the reference regardless of scroll position,
                  fully hiding the previous card underneath it either way. */}
              <div
                style={{
                  background:
                    "radial-gradient(38% 35% at 88% 4%, rgba(40,120,235,0.55), transparent 100%), radial-gradient(34% 32% at 6% 96%, rgba(20,163,255,0.4), transparent 100%), #05070a",
                }}
                className="relative grid grid-cols-1 gap-5 overflow-hidden rounded-[1.5rem] border border-white/15 p-5 shadow-[0_40px_100px_rgba(0,0,0,0.65)] sm:gap-8 sm:rounded-[2rem] sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-14"
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

                  <div className="relative">
                    <div className="flex items-center justify-between sm:block">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-bright/30 bg-blue-bright/10 backdrop-blur-sm sm:h-11 sm:w-11">
                        <ServiceIcon slug={s.slug} className="h-4 w-4 text-blue-bright sm:h-5 sm:w-5" />
                      </span>
                      <span className="flex items-baseline gap-1 font-mono sm:mt-6">
                        <span className="text-gradient-blue text-2xl font-bold sm:text-3xl">{s.n}</span>
                        <span className="text-xs text-white/50 sm:text-sm">/ 05</span>
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-display text-2xl font-medium tracking-tight text-white sm:mt-2 sm:text-3xl lg:text-4xl">
                      {s.name}
                    </h3>
                    <p className="mt-2 max-w-md text-xs font-light text-white/70 sm:mt-3 sm:text-sm">{s.long}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-blue-bright/25 bg-blue-bright/10 px-2.5 py-0.5 text-[10px] text-blue-bright backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/services#${s.slug}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-grad-blue px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-white shadow-[0_10px_30px_rgba(20,163,255,0.35)] transition-transform duration-300 hover:scale-105 sm:mt-8 sm:px-6 sm:py-3 sm:text-sm"
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
