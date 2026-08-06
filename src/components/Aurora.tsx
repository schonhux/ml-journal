"use client";

import { motion } from "framer-motion";

/* Slow, breathing aurora blobs behind the content. The third blob
   uses the live --accent color so it tints per active tab. */

export default function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <motion.div
        className="aurora-blob a1"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-blob a2"
        animate={{ x: [0, -30, 30, 0], y: [0, 20, -25, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-blob a3"
        animate={{ scale: [1, 1.15, 1], opacity: [0.28, 0.45, 0.28] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
