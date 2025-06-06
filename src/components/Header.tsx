"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Bloquer le scroll quand drawer est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-md z-50 transition-all">
      <div className="flex items-center justify-between px-6 py-4">
        {/* LOGO animé */}
        <div className="flex items-center space-x-1 text-3xl font-bold text-primary">
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
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-6 text-black">
          {['Cours', 'Dictionnaire', 'Connexion'].map(label => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="relative inline-flex items-center gap-2 overflow-hidden px-4 py-2 rounded text-lg text-neutral-900 bg-white  group transition-all duration-300 hover:text-white"
            >
              <span className="relative z-10">{label}</span>
              <span
                className="absolute left-0 top-0 h-full w-0 bg-green-800 transition-all duration-500 ease-in-out group-hover:w-full z-0"
              />
            </a>
          ))}
        </nav>

        {/* Bouton burger mobile */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-black">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Drawer Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full bg-white shadow-md rounded-b-2xl p-6 space-y-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col space-y-4 text-lg text-black">
                {['Cours', 'Dictionnaire', 'Connexion'].map(label => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="relative inline-flex items-center gap-2 overflow-hidden px-4 py-2 rounded text-lg text-neutral-900 bg-white border-2 border-primary group transition-all duration-300 hover:text-white"
                  >
                    <span className="relative z-10">{label}</span>
                    <span
                      className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-500 ease-in-out group-hover:w-full z-0"
                    />
                  </a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </header>
  );
}
