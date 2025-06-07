"use client";

import { FC } from "react";
import { motion } from "framer-motion";

const AboutSection: FC = () => {
  return (
    <section
      id="about"
      className="h-screen w-full bg-white text-black flex flex-col justify-center items-center px-6 md:px-16 text-center"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        À propos de <span className="text-green-800">Mbolo</span>
      </motion.h2>

      <motion.p
        className="text-base md:text-lg max-w-3xl text-gray-700 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Notre mission est de préserver et transmettre les langues vernaculaires d’Afrique centrale. 
        Grâce à une plateforme moderne et ludique, nous offrons aux jeunes générations un moyen simple d’apprendre, pratiquer et partager leur héritage linguistique.
      </motion.p>

      <motion.p
        className="text-sm md:text-base max-w-2xl text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Notre vision est un monde où chaque langue, même minoritaire, peut continuer de vivre à travers les technologies modernes, la culture et l’éducation.
      </motion.p>
    </section>
  );
};

export default AboutSection;
