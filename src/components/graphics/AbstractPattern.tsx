function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(h, 31) + seed.charCodeAt(i)) >>> 0;
  return () => {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    return h / 4294967296;
  };
}

export default function AbstractPattern({
  seed,
  className = "",
  nodeCount = 6,
}: {
  seed: string;
  className?: string;
  nodeCount?: number;
}) {
  const rand = seededRandom(seed);
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: 8 + rand() * 84,
    y: 8 + rand() * 84,
    r: 1.4 + rand() * 2.6,
  }));

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <g stroke="white" strokeOpacity="0.22" strokeWidth="0.35">
        {nodes.slice(0, -1).map((n, i) => (
          <line key={i} x1={n.x} y1={n.y} x2={nodes[i + 1].x} y2={nodes[i + 1].y} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill="white" fillOpacity={i === 0 ? 0.85 : 0.32} />
      ))}
    </svg>
  );
}
