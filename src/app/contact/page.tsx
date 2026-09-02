import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectBrief from "@/components/sections/ProjectBrief";
import ContactIcon from "@/components/graphics/ContactIcon";
import Reveal from "@/components/Reveal";
import { SITE_OG_IMAGE } from "@/lib/seo";

const TITLE = "Contact | NexBrave Solutions";
const DESCRIPTION = "Tell us about your project. We reply within one business day.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/contact", images: [SITE_OG_IMAGE] },
  twitter: { title: TITLE, description: DESCRIPTION, images: [SITE_OG_IMAGE.url] },
};

const INFO = [
  {
    label: "Email",
    value: "bravesolution43@gmail.com",
    href: "mailto:bravesolution43@gmail.com",
    icon: "email",
  },
  { label: "Phone", value: "+91 92297 38040", href: "tel:+919229738040", icon: "phone" },
  {
    label: "Studio",
    value: "3A, 3rd Floor J&Sons Residence, Main Road Baragain, near Ganga Hospital, Ranchi, Jharkhand 834009",
    href: undefined,
    icon: "pin",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's start something."
        gradientWords={["something."]}
        description="Tell us about your project, your timeline, and your budget range. We reply within one business day, usually faster."
      />

      <section className="bg-[#0A0E14] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <Reveal className="flex flex-col gap-4">
              {INFO.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 p-6 transition-colors duration-300 hover:border-white/25"
                >
                  <span className="flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-white/40">
                    <ContactIcon slug={item.icon} className="h-4 w-4 text-blue-bright" />
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-3 block font-display text-xl font-medium transition-colors hover:text-blue-bright sm:text-2xl"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-3 font-display text-xl font-medium sm:text-2xl">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}

              <div className="mt-2 rounded-2xl border border-white/10 p-6">
                <span className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Studio hours
                </span>
                <p className="mt-3 text-xs font-light sm:text-sm text-white/60">
                  Monday – Saturday, IST
                  <br />
                  Async replies outside working hours for urgent briefs.
                </p>
              </div>
            </Reveal>

            <Reveal
              delay={0.1}
              className="relative h-[320px] overflow-hidden rounded-2xl border border-white/10 sm:h-[420px] lg:h-full"
            >
              <iframe
                src="https://www.google.com/maps?q=3A+3rd+Floor+J%26Sons+Residence,+Main+Road+Baragain,+near+Ganga+Hospital,+Ranchi,+Jharkhand+834009&output=embed"
                title="NexBrave Solutions studio location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[0.4] contrast-[1.05] transition-[filter] duration-500 hover:grayscale-0"
                style={{ border: 0 }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <ProjectBrief />
    </>
  );
}
