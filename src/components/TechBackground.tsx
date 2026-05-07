"use client";

import { motion } from "framer-motion";

export default function TechBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />
      <motion.div
        className="absolute inset-0 bg-animated-gradient opacity-60"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundSize: "220% 220%" }}
      />
      <div className="absolute inset-0 bg-soft-noise opacity-[0.14]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(62,231,255,0.22),transparent_55%)]" />

      <motion.div
        className="absolute -top-44 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-neon-cyan/[0.16] blur-3xl"
        animate={{ y: [0, 18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-52 -left-44 h-[640px] w-[640px] rounded-full bg-neon-purple/[0.14] blur-3xl"
        animate={{ y: [0, -16, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-52 -right-44 h-[640px] w-[640px] rounded-full bg-neon-green/[0.12] blur-3xl"
        animate={{ y: [0, -14, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(circle_at_50%_20%,black,transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>
    </div>
  );
}
