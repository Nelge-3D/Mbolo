"use client";

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";
import { HiLightBulb } from "react-icons/hi";
import "react-circular-progressbar/dist/styles.css";

export default function KnowledgeProgress({ progress }: { progress: number }) {
  const glowColor =
    progress >= 75 ? "#10B981" :
    progress >= 50 ? "#F59E0B" :
    progress >= 25 ? "#2563EB" : "#9CA3AF";

  return (
    <div className="w-40 h-40 mx-auto">
      <CircularProgressbarWithChildren
        value={progress}
        styles={buildStyles({
          pathColor: glowColor,
          trailColor: "#E5E7EB",
        })}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: progress > 0 ? 1 : 0.5,
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center items-center"
        >
          <HiLightBulb size={20} color={glowColor} />
        </motion.div>
        <div className="mt-2 text-sm text-grayDark">
          {progress}% appris
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
