"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Hero from "@/sections/Hero";
import SocialProof from "@/sections/SocialProof";
import PainPoints from "@/sections/PainPoints";
import Benefits from "@/sections/Benefits";
import Services from "@/sections/Services";
import Demos from "@/sections/Demos";
import CaseStudies from "@/sections/CaseStudies";
import Process from "@/sections/Process";
import Technologies from "@/sections/Technologies";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import LeadCapture from "@/sections/LeadCapture";

export default function Site() {
  return (
    <div className="min-h-screen bg-background text-primary">
      <Navbar />
      <main id="topo">
        <Hero />
        <SocialProof />
        <PainPoints />
        <Benefits />
        <Services />
        <Demos />
        <CaseStudies />
        <Process />
        <Technologies />
        <Testimonials />
        <FAQ />
        <LeadCapture />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
