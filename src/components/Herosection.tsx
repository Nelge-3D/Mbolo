"use client";

import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const greetings = [
  "Hello", "Bonjour", "Hallo", "Ciao", "Ola", "Namaste", "Salaam", "Konnichiwa",
  "Zdravstvuyte", "Nǐ hǎo", "Anyoung", "Merhaba", "Shalom", "Szia", "Sawubona",
  "Yā", "Salve", "Mbolo", "Selam", "Hej", "Halo", "Hoi", "Habari", "Saluton"
];

interface WordProps {
  id: number;
  text: string;
  x: number;
  y: number;
}

const ImmersiveHeader: FC = () => {
  const [words, setWords] = useState<WordProps[]>([]);

  const spawnWord = () => {
    const text = greetings[Math.floor(Math.random() * greetings.length)];
    const id = Math.floor(Math.random() * 100000);
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    return { id, text, x, y };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWords(prev => {
        const next = [...prev, spawnWord()];
        return next.length > 15 ? next.slice(next.length - 15) : next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center text-center px-4">
      {/* Mots animés */}
      <AnimatePresence>
        {words.map(({ id, text, x, y }) => (
          <motion.span
            key={id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.2, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 3 }}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              fontSize: `${Math.floor(Math.random() * 24 + 12)}px`,
              color: "green",
              pointerEvents: "none",
              zIndex: 0,
              fontWeight: "bold"
            }}
          >
            {text}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Logo Mbolo */}
      <h1
        className="text-[60px] sm:text-[80px] md:text-[120px] font-black text-black z-10 font-[Italiana]"
        style={{ fontFamily: "'Italiana', serif" }}
      >
        <span>M</span>
        <span>b</span>
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="inline-block"
        >
          o
        </motion.span>
        <span>l</span>
        <motion.span
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="inline-block"
        >
          o
        </motion.span>
      </h1>

      {/* Sous-texte */}
      <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 max-w-xl z-10">
        Apprends à ton rythme et contribue à préserver nos patrimoines linguistiques.
      </p>

      {/* Chevron animé */}
      <motion.div
        className="mt-8 sm:mt-12 text-primary z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={32} />
      </motion.div>

      {/* Section langues */}
      <div className="absolute bottom-4 sm:bottom-6 flex flex-wrap justify-center gap-4 z-10 px-2">
        {["Teke", "Nzebi", "Fang"].map(lang => (
  <motion.button
    key={lang}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="relative inline-flex items-center gap-2 overflow-hidden px-6 py-3 text-lg rounded border-2 shadow-2xl text-neutral-900 bg-primary transition-all duration-300 hover:text-white group"
  >
    {/* Modification du lien */}
    <Link href={`#${lang.toLowerCase()}`} className="relative z-10">
      {lang}
    </Link>
    <span
      className="absolute left-0 top-0 h-full w-0 bg-green-800 transition-all duration-500 ease-in-out group-hover:w-full z-0"
    />
  </motion.button>
))}
      </div>
    </section>
  );
};

export default ImmersiveHeader;
