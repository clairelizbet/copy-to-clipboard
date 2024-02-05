import { test, expect } from "@playwright/test"

test("Copy", async ({ page }) => {
  // Give server a couple seconds to boot
  await page.waitForTimeout(2000)
  await page.goto("https://localhost:4443")

  page.on("console", (msg) => {
    if (msg.type() === "error") test.fail()
  })

  const modifier = "Control"
  await page.focus(".paste-target")
  await page.keyboard.press(`${modifier}+KeyA`)
  await page.keyboard.press(`${modifier}+KeyC`)

  await page.locator("#springfield").click()

  await page.focus(".paste-target")
  await page.keyboard.press(`${modifier}+KeyA`)
  await page.keyboard.press(`${modifier}+KeyV`)

  expect(
    await page.evaluate(
      () => document.querySelector(".paste-target")?.textContent,
    ),
  ).toBe("Springfield")
})

test("Copy using execCommand", async ({ page }) => {
  // Give server a couple seconds to boot
  await page.waitForTimeout(2000)
  await page.goto("https://localhost:4443")

  page.on("console", (msg) => {
    if (msg.type() === "error") test.fail()
  })

  const modifier = "Control"
  await page.focus(".paste-target")
  await page.keyboard.press(`${modifier}+KeyA`)
  await page.keyboard.press(`${modifier}+KeyC`)

  await page.locator("#sanfrancisco").click()

  await page.focus(".paste-target")
  await page.keyboard.press(`${modifier}+KeyA`)
  await page.keyboard.press(`${modifier}+KeyV`)

  expect(
    await page.evaluate(
      () => document.querySelector(".paste-target")?.textContent,
    ),
  ).toBe("San Francisco")
})

test("Copy restores selection", async ({ page }) => {
  // Give server a couple seconds to boot
  await page.waitForTimeout(2000)
  await page.goto("https://localhost:4443")

  let priorSelection: string

  await page.evaluate(() => {
    const selection = window.getSelection()
    if (!selection) throw new Error("Could not access selection API")
    selection.removeAllRanges()

    const range = document.createRange()
    const pTag = document.querySelector("main > p:first-of-type")
    if (!pTag) throw new Error("Could not find main paragraph")
    range.selectNode(pTag)
    priorSelection = JSON.stringify(range.getBoundingClientRect())
    selection.addRange(range)
  })

  await page.locator("#springfield").click()
  await page.locator("#sanfrancisco").click()

  expect(
    await page.evaluate(() => {
      const selection = window.getSelection()
      if (!selection) throw new Error("Could not access selection API")
      if (selection.rangeCount !== 1) return false

      const currentSelection = JSON.stringify(
        selection.getRangeAt(0).getBoundingClientRect(),
      )
      return currentSelection === priorSelection
    }),
  ).toBe(true)
})
