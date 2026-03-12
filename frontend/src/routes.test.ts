import { describe, expect, it } from "vitest"
import { routes } from "./main"

describe("routes", () => {
  it("includes expected top-level routes", () => {
    const root = routes.find((r) => r.path === "/")
    expect(root).toBeTruthy()
    expect(root?.children?.some((c) => c.index)).toBe(true)

    const childPaths = (root?.children || [])
      .map((c) => c.path)
      .filter(Boolean)

    expect(childPaths).toContain("services")
    expect(childPaths).toContain("portfolio")
    expect(childPaths).toContain("about")
    expect(childPaths).toContain("contact")
  })
})
