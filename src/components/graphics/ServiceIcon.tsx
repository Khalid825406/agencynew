import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  "web-development": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8.5h18" />
      <circle cx="6" cy="6.25" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="8" cy="6.25" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  "app-development": (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M11 18.2h2" />
    </>
  ),
  "digital-marketing": (
    <>
      <path d="M3 11v3a1 1 0 0 0 1 1h2l4 3.5v-11.8L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M15 8.5a4 4 0 0 1 0 8" />
      <path d="M17.5 6a7.5 7.5 0 0 1 0 13" />
    </>
  ),
  "seo-services": (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3 20 20" />
      <path d="M10.5 7.5v6M7.5 10.5h6" />
    </>
  ),
  "video-editing": (
    <>
      <rect x="2.5" y="5" width="14" height="14" rx="2" />
      <path d="m21.5 8.5-5 3v1l5 3v-7Z" />
      <path d="m9 9.5 4 2.5-4 2.5v-5Z" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function ServiceIcon({
  slug,
  className = "h-10 w-10",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[slug] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
