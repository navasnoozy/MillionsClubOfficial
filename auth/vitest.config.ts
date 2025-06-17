import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "./src/test/setup.test",
    environment: "node",
  },
});
