"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Shuffle, Star, ChevronDown } from "lucide-react";
import { useEffect } from "react";

// Dictionnaire
const wordCards = {
  Teke: [
    { word: "Mbote", translation: "Bonjour", audio: "/audio/teke/mbote.mp3" },
    { word: "Bana", translation: "Enfant", audio: "/audio/teke/bana.mp3" },
  ],
  Nzebi: [
    { word: "Nsalamu", translation: "Salut", audio: "/audio/nzebi/nsalamu.mp3" },
    { word: "Mwana", translation: "Enfant", audio: "/audio/nzebi/mwana.mp3" },
  ],
  Fang: [
    { word: "Mbolo", translation: "Bonjour", audio: "/audio/fang/mbolo.mp3" },
    { word: "Nna", translation: "Maman", audio: "/audio/fang/nna.mp3" },
  ],
} as const;

type Lang = keyof typeof wordCards;
const getQCM = (lang: Lang) => {
  const words = wordCards[lang];
  const correct = words[0];
  return {
    question: `Que veut dire "${correct.word}" ?`,
    choices: [
      correct.translation,
      ...words.slice(1).map((w) => w.translation),
    ].sort(() => 0.5 - Math.random()),
    answer: correct.translation,
  };
};

const LanguageDemoSection: FC = () => {
  const [activeLang, setActiveLang] = useState<Lang>("Teke");
  const [score, setScore] = useState(0);
  const [showQCM, setShowQCM] = useState(false);
  const qcm = getQCM(activeLang);

  const playAudio = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  const checkAnswer = (choice: string) => {
    if (choice === qcm.answer) {
      setScore((s) => s + 1);
      alert("✅ Bonne réponse !");
    } else {
      alert("❌ Mauvaise réponse.");
    }
    setShowQCM(false);
  };

   // Nouvel effet pour gérer les ancres
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && ["teke", "nzebi", "fang"].includes(hash)) {
      setActiveLang(hash.charAt(0).toUpperCase() + hash.slice(1) as Lang);
    }
  }, []);

  return (
    <section id="demo" className="relative w-full h-screen px-4 md:px-8 py-10 md:py-16 bg-gray-50 text-black overflow-hidden">
      {/* Ajout des ancres pour chaque langue */}
      <div id="teke" className="absolute top-0 left-0 -mt-20" />
      <div id="nzebi" className="absolute top-0 left-0 -mt-20" />
      <div id="fang" className="absolute top-0 left-0 -mt-20" />
      {/* Tabs & Connexion */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-300 pb-4 mb-6 gap-4">
        <div className="flex justify-center md:justify-start space-x-4">
          {Object.keys(wordCards).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setActiveLang(lang as Lang);
                setScore(0);
              }}
              className={`px-4 py-2 font-medium text-sm md:text-base border-b-2 ${
                activeLang === lang
                  ? "border-green-800 text-green-800"
                  : "border-transparent text-gray-500 hover:text-green-800"
              } transition`}
            >
              Démo {lang}
            </button>
          ))}
        </div>
        <div className="flex justify-center md:justify-end">
          <button className="relative inline-flex items-center gap-2 overflow-hidden px-5 py-2 text-sm md:text-base rounded border shadow-2xl text-neutral-900 bg-primary transition-all duration-300 hover:text-white group">
            <span className="relative z-10">Connexion</span>
            <span className="absolute left-0 top-0 h-full w-0 bg-green-800 transition-all duration-500 ease-in-out group-hover:w-full z-0" />
          </button>
        </div>
      </div>

      {/* Intro */}
      <div className="text-center mb-8">
        <motion.h2 className="text-base md:text-xl font-semibold mb-2 px-4">
          {activeLang === "Teke" &&
            "Bienvenue sur la démo Teke. Apprends les bases à ton rythme."}
          {activeLang === "Nzebi" &&
            "Bienvenue sur la démo Nzebi. Découvre des mots essentiels."}
          {activeLang === "Fang" &&
            "Bienvenue sur la démo Fang. Explore des expressions courantes."}
        </motion.h2>
        <motion.div
          className="flex justify-center items-center gap-2 text-green-700 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Star className="fill-green-600 w-5 h-5" />
          Score : {score} / 5
        </motion.div>
      </div>

      {/* Cartes mots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto mb-10 px-2">
        {wordCards[activeLang].map(({ word, translation, audio }, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-4 md:p-6 bg-white shadow-md rounded-xl border relative group"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-1">{word}</h3>
            <p className="text-gray-600 text-sm md:text-base">{translation}</p>
            <button
              onClick={() => playAudio(audio)}
              className="absolute bottom-3 right-3 p-2 rounded-full bg-green-100 hover:bg-green-200"
            >
              <Volume2 size={18} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Mini-jeu QCM */}
      <div className="text-center mb-10 px-2">
        {showQCM ? (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow max-w-md mx-auto">
            <p className="text-base md:text-lg mb-4 font-medium">{qcm.question}</p>
            <div className="flex flex-col gap-2">
              {qcm.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => checkAnswer(choice)}
                  className="px-4 py-2 text-sm bg-green-100 hover:bg-green-200 rounded"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <motion.button
            onClick={() => setShowQCM(true)}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-3 text-white bg-green-800 rounded-full shadow hover:bg-green-700 transition"
          >
            <Shuffle size={18} />
            Mini-jeu : QCM
          </motion.button>
        )}
        <p className="mt-2 text-sm text-gray-500">Teste tes connaissances.</p>
      </div>

      {/* Mascotte */}
      <div className="absolute bottom-4 right-4 md:right-10">
        <motion.img
          src="/boko_idle.png"
          alt="Mascotte Boko"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-16 h-16 md:w-20 md:h-20"
        />
      </div>

      {/* Chevron démo suivante */}
      <div className="text-center mt-8">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="inline-block text-green-800"
        >
          <ChevronDown className="w-7 h-7" />
        </motion.div>
        <p className="text-sm text-gray-500">Se connecter pour découvre la suite</p>
      </div>
    </section>
  );
};

export default LanguageDemoSection;
