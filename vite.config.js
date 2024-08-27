/// <reference types="vitest/config" /

import path from "node:path";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, "src"),
  publicDir: path.resolve(__dirname, "public"),
  test: {
    dir: path.resolve(__dirname, "test"),
    coverage: {
      reportsDirectory: path.resolve(__dirname, "reports"),
      reporter: ["text", "cobertura", "lcovonly"],
    },
  },
});
