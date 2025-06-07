// app/page.tsx (ou app/home/page.tsx selon l’architecture)

import HeroSection from "@/components/Herosection";
import LanguagesSection from "@/components/LanguagesSection";
import Footer from "@/components/Footer";
import About from "@/components/About";
import ContactSection from "@/components/Contact";


export default function Home() {
  return (
    <main className="bg-background text-text font-sans">
      
      <HeroSection />
      <About/>
      <ContactSection/>
      <LanguagesSection />
      <Footer />
    </main>
  );
}
