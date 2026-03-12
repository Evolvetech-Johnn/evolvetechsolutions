import { beforeEach, describe, expect, it, vi } from "vitest"
import { getLocale, setLocale, t } from "./index"

type StorageStub = {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
  clear: () => void
}

function createLocalStorageStub(initial: Record<string, string> = {}): StorageStub {
  let store = { ...initial }
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => {
      store[key] = value
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
}

beforeEach(() => {
  const storage = createLocalStorageStub()
  Object.defineProperty(globalThis, "localStorage", {
    value: storage,
    configurable: true,
  })

  Object.defineProperty(globalThis, "window", {
    value: { dispatchEvent: vi.fn() },
    configurable: true,
  })
})

describe("i18n", () => {
  it("defaults to pt-BR when no locale is stored", () => {
    expect(getLocale()).toBe("pt-BR")
  })

  it("setLocale persists locale and dispatches event", () => {
    setLocale("en-US")
    expect(getLocale()).toBe("en-US")
    expect(window.dispatchEvent).toHaveBeenCalledTimes(1)
  })

  it("t() returns translated values and falls back to key when missing", () => {
    setLocale("pt-BR")
    expect(t("home.servicesTitle")).toBe("Nossos Serviços")
    expect(t("does.not.exist")).toBe("does.not.exist")
  })
})

