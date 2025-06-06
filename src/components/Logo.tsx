import { motion } from "framer-motion";

export default function MboloLogo() {
  return (
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
  );
}
