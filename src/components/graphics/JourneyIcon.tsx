import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  discover: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3 20 20" />
    </>
  ),
  design: (
    <>
      <path d="M4 20 5 16 15 6l3 3L8 19l-4 1Z" />
      <path d="m14 5 3 3" />
    </>
  ),
  develop: (
    <>
      <path d="m8 6-5 6 5 6" />
      <path d="m16 6 5 6-5 6" />
    </>
  ),
  deploy: (
    <>
      <rect x="4" y="15" width="16" height="5" rx="1" />
      <path d="M12 12.5V3" />
      <path d="m8 7 4-4 4 4" />
    </>
  ),
  grow: (
    <>
      <path d="M3 17 9 11 13 15 21 7" />
      <path d="M15 7h6v6" />
    </>
  ),
};

export default function JourneyIcon({
  slug,
  className = "h-6 w-6",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[slug] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
