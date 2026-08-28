import DomeGallery from "@/components/graphics/DomeGallery";

const GALLERY_IMAGES = [
  { src: "/webdeveloper.png", alt: "Web development work" },
  { src: "/app.png", alt: "App development work" },
  { src: "/digitalmarketing.png", alt: "Digital marketing work" },
  { src: "/seo.png", alt: "SEO services work" },
  { src: "/videoediting.png", alt: "Video editing work" },
];

export default function DomeGallerySection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#05070a] text-white">
      {/* Same "aurora glow" background used across the site (Services
          stack, about-page founder quote): two soft blue blobs on a
          near-black base, clipped in their own wrapper so they don't
          affect layout. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-20 h-[700px] w-[700px] rounded-full bg-blue-deep/45 blur-[140px]" />
        <div className="absolute -left-32 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-bright/25 blur-[130px]" />
      </div>

      <div className="relative h-[100svh] w-full overflow-hidden">
        <DomeGallery
          images={GALLERY_IMAGES}
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          overlayBlurColor="#05070a"
          grayscale={false}
        />
      </div>
    </section>
  );
}
