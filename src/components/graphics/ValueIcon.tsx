import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  craft: (
    <>
      <path d="M14.5 3.5 20.5 9.5 9.5 20.5 3.5 20.5 3.5 14.5Z" />
      <path d="m13 5 6 6" />
    </>
  ),
  ship: (
    <>
      <path d="M4 12h11" />
      <path d="m10 6 6 6-6 6" />
      <path d="M18 6v12" />
    </>
  ),
  numbers: (
    <>
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-7" />
      <path d="M20 19v-3" />
    </>
  ),
  truth: (
    <>
      <path d="M4 5h13l3 3.5L17 12H4Z" />
      <path d="M4 12v7" />
    </>
  ),
};

export default function ValueIcon({
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
