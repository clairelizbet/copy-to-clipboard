import { defineConfig } from "./node_modules/@playwright/test/index"

export default defineConfig({
  use: {
    ignoreHTTPSErrors: true,
    defaultBrowserType: "firefox",
  },
})
