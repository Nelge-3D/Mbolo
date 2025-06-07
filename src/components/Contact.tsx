"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";

const ContactSection: FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci pour votre message !");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="h-screen w-full bg-gray-50 text-black flex flex-col justify-center items-center px-6 md:px-16"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contacte <span className="text-green-800">l&apos;équipe</span>
      </motion.h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 md:p-8 rounded-xl shadow-md border space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Ton nom"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <input
          type="email"
          name="email"
          placeholder="Ton email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <textarea
          name="message"
          placeholder="Ton message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center gap-2 overflow-hidden px-6 py-3 text-lg rounded border-2 shadow-2xl text-neutral-900 bg-primary transition-all duration-300 hover:text-white group"
        >
          <span className="relative z-10">Envoyer</span>
          <span className="absolute left-0 top-0 h-full w-0 bg-green-800 transition-all duration-500 ease-in-out group-hover:w-full z-0" />
        </motion.button>
      </form>
    </section>
  );
};

export default ContactSection;
