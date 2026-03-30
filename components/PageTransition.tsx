"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Starts invisible and slightly lower
      animate={{ opacity: 1, y: 0 }}  // Slides up and fades in
      exit={{ opacity: 0, y: -20 }}   // Slides out when navigating away
      transition={{ 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] // Custom "Industrial" ease-out cubic
      }}
    >
      {children}
    </motion.div>
  );
}