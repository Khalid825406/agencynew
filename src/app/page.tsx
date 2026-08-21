import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import VideoReel from "@/components/sections/VideoReel";
import Journey from "@/components/sections/Journey";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import CTAContact from "@/components/sections/CTAContact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <VideoReel />
      <Journey />
      <Stats />
      <Testimonials />
      <CTAContact />
    </>
  );
}
