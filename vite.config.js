/// <reference types="vitest/config" /

import path from "node:path";

import { defineConfig } from "vite";
import html from "@tomjs/vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, "src"),
  plugins: [html({ minify: true })],
  publicDir: path.resolve(__dirname, "public"),
  test: {
    dir: path.resolve(__dirname, "test"),
    coverage: {
      reportsDirectory: path.resolve(__dirname, "reports"),
      reporter: ["text", "cobertura", "lcovonly"],
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: "src/index.html",
        results: "src/results.html",
      },
    },
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
