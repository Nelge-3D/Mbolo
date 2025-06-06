// app/page.tsx (ou app/home/page.tsx selon l’architecture)

import HeroSection from "@/components/Herosection";
import LanguagesSection from "@/components/LanguagesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-background text-text font-sans">
      
      <HeroSection />
      <LanguagesSection />
      <Footer />
    </main>
  );
}
