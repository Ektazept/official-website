import { ToastProvider } from "@/components/ToastProvider";
import RevealObserver from "@/components/RevealObserver";
import BackgroundFX from "@/components/BackgroundFX";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Vision from "@/components/Vision";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ToastProvider>
      <BackgroundFX />
      <RevealObserver />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Stats />
        <Vision />
        <Testimonials />
        <Team />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </ToastProvider>
  );
}
