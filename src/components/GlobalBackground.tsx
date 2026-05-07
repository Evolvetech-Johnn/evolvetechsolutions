"use client";

import { motion } from "framer-motion";

export default function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />
      <motion.div
        className="absolute inset-0 bg-animated-gradient opacity-25"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundSize: "240% 240%" }}
      />
      <div className="absolute inset-0 bg-soft-noise opacity-[0.10]" />
      <div className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(circle_at_50%_10%,black,transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>
    </div>
  );
}

