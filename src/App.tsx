import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Hero from "@/sections/Hero";
import ProblemSolution from "@/sections/ProblemSolution";
import Services from "@/sections/Services";
import Portfolio from "@/sections/Portfolio";
import SocialProof from "@/sections/SocialProof";
import Differentials from "@/sections/Differentials";
import Process from "@/sections/Process";
import FinalCTA from "@/sections/FinalCTA";
import Legal from "@/sections/Legal";
import CookieBanner from "@/components/CookieBanner";

export default function App() {
  return (
    <div className="min-h-dvh bg-ink-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Services />
        <Portfolio />
        <SocialProof />
        <Differentials />
        <Process />
        <FinalCTA />
        <Legal />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </div>
  );
}

