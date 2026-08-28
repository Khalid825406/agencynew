import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  facebook: (
    <>
      <path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="9" width="4" height="11" />
      <circle cx="5" cy="4.5" r="2" />
      <path d="M11 20v-7a3.5 3.5 0 0 1 7 0v7" />
      <path d="M11 12.5V9" />
    </>
  ),
  x: (
    <>
      <path d="m5 5 14 14" />
      <path d="m19 5-14 14" />
    </>
  ),
  dribbble: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M4.2 9.3c5.3 1.7 11.2 1.5 15.6-.6" />
      <path d="M4.9 16.8c3-4 6-9.5 6.7-13.9" />
      <path d="M20.6 14.4c-2.7-.8-6.4-.4-9 1.4-1.9 1.3-3.3 3.2-4.3 5.2" />
    </>
  ),
};

export default function SocialIcon({
  slug,
  className = "h-4 w-4",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[slug] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
