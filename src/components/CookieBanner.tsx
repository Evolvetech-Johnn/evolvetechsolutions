"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

type Consent = "accepted" | "rejected";

const storageKey = "ets_cookie_consent";

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(storageKey);
  if (v === "accepted" || v === "rejected") return v;
  return null;
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  const visible = consent === null;

  const actions = useMemo(
    () => [
      {
        label: "Recusar",
        value: "rejected" as const,
        className:
          "inline-flex h-11 items-center justify-center rounded-xl bg-white/5 px-5 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/[0.08] hover:ring-white/20"
      },
      {
        label: "Aceitar",
        value: "accepted" as const,
        className:
          "inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple px-5 text-sm font-semibold text-ink-950 shadow-glowStrong transition hover:brightness-110"
      }
    ],
    []
  );

  if (!visible) {
    if (consent === "accepted") {
      return <GoogleAnalytics gaId="G-Y1NVK8N2YK" />;
    }
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-ink-900/80 ring-1 ring-white/10 shadow-glowStrong backdrop-blur"
        role="dialog"
        aria-label="Preferências de cookies"
      >
        <div className="p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-sm font-semibold text-white">
                Privacidade e cookies
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Usamos apenas o essencial para funcionamento do site. Você pode aceitar
                ou recusar cookies não essenciais. Leia a{" "}
                <a href="/privacidade" className="font-semibold text-white/80 hover:text-white">
                  política de cookies e privacidade
                </a>
                .
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              {actions.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  className={a.className}
                  onClick={() => {
                    window.localStorage.setItem(storageKey, a.value);
                    setConsent(a.value);
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
