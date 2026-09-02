import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/sections/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/lib/seo";

// SF Pro Display itself can't be self-hosted for the web (Apple's license
// restricts it to Apple platforms/software) — Inter is the closest legally
// embeddable match: same clean, geometric-grotesk feel, full weight range
// including bold. Used for both the display/heading font and body font so
// the whole site reads as one uniform sans-serif family.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const TITLE = "NexBrave Solutions: Digital Agency";

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "digital agency",
    "web development",
    "app development",
    "digital marketing",
    "SEO services",
    "video editing",
    "brand strategy",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE.url],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/nexbravelogobackbg.png`,
  logo: `${SITE_URL}/nexbravelogobackbg.png`,
  description: SITE_DESCRIPTION,
  telephone: "+91-92297-38040",
  email: "bravesolution43@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3A, 3rd Floor J&Sons Residence, Main Road Baragain, near Ganga Hospital",
    addressLocality: "Ranchi",
    addressRegion: "Jharkhand",
    postalCode: "834009",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61587412182705",
    "https://www.instagram.com/nexbravesolutions",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#0A0E14] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
