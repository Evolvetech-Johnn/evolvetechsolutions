import ptBR from "../../locales/pt-BR.json"
import enUS from "../../locales/en-US.json"

type Dict = Record<string, any>
const dictionaries: Record<string, Dict> = {
  "pt-BR": ptBR as Dict,
  "en-US": enUS as Dict
}

export function getLocale(): string {
  const stored = localStorage.getItem("locale")
  return stored && dictionaries[stored] ? stored : "pt-BR"
}

export function setLocale(locale: string) {
  if (dictionaries[locale]) {
    localStorage.setItem("locale", locale)
    window.dispatchEvent(new Event("localechange"))
  }
}

export function t(key: string): string {
  const parts = key.split(".")
  let obj: any = dictionaries[getLocale()]
  for (const p of parts) {
    if (obj && p in obj) obj = obj[p]
    else return key
  }
  return typeof obj === "string" ? obj : key
}
