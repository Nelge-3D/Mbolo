// components/FloatingMenu.tsx
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'contact', label: 'Nous contater' },
  { id: 'demo', label: 'Démo' },
]

export default function FloatingMenu() {
  const [open, setOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="mb-2 flex flex-col gap-2"
          >
            {sections.map((section) => (
              <li
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="cursor-pointer rounded-xl bg-white px-4 py-2 text-sm shadow-md transition hover:bg-gray-100"
              >
                {section.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-800 text-white shadow-lg transition hover:scale-105"
        aria-label="Menu de navigation"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  )
}
