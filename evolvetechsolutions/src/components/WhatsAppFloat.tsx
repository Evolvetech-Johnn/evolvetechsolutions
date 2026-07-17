"use client";

import { motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const wa = buildWhatsAppUrl({
    phoneE164: siteConfig.whatsapp.phoneE164,
    message: "Olá! Gostaria de solicitar um diagnóstico gratuito.",
  });

  return (
    <motion.a
      href={wa}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-action text-white shadow-2xl shadow-brand-action/30 border-4 border-brand-surface"
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <MessageCircle className="h-8 w-8" />
    </motion.a>
  );
}

