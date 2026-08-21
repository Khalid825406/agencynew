const TAGS = [
  "Web Development",
  "App Development",
  "Digital Marketing",
  "SEO",
  "Video Editing",
  "Motion Design",
  "Brand Strategy",
  "PPC",
];

export default function Marquee() {
  const loop = [...TAGS, ...TAGS];
  return (
    <div className="group relative overflow-hidden border-y border-white/10 bg-[#0A0E14] py-6">
      <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
        {loop.map((tag, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-2xl sm:text-3xl font-medium text-white/20 whitespace-nowrap">
              {tag}
            </span>
            <span className="h-2 w-2 rounded-full bg-grad-blue shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
