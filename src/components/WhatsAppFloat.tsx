import { motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export default function WhatsAppFloat() {
  const wa = buildWhatsAppUrl({
    phoneE164: siteConfig.whatsapp.phoneE164,
    message: siteConfig.whatsapp.defaultMessage
  });

  return (
    <motion.a
      href={wa}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-green to-neon-cyan text-ink-950 shadow-glowStrong ring-1 ring-white/10"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.46c-.25-.13-1.47-.73-1.7-.81-.23-.09-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.51.12-.12.25-.29.38-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.87-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.45.06-.69.32-.24.25-.9.88-.9 2.15 0 1.27.92 2.5 1.05 2.67.13.17 1.81 2.76 4.38 3.87.61.26 1.08.41 1.45.53.61.19 1.17.16 1.61.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29ZM16.02 3C9.38 3 4 8.38 4 15.02c0 2.1.55 4.14 1.6 5.94L4 29l8.27-1.54c1.74.95 3.69 1.46 5.75 1.46C24.62 28.92 30 23.54 30 16.9 30 10.26 24.62 4.88 17.98 4.88c-.66 0-1.31.05-1.96.12ZM18 26.66c-1.87 0-3.65-.52-5.19-1.5l-.37-.23-4.91.92.93-4.79-.24-.39c-1.03-1.62-1.57-3.5-1.57-5.45C6.65 10.11 10.76 6 15.87 6c.58 0 1.15.05 1.71.14 4.3.71 7.59 4.45 7.59 8.93 0 5.13-4.17 9.3-9.17 9.3Z" />
      </svg>
    </motion.a>
  );
}

