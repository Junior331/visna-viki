import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    target: "es2020",
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./viteConfig.ts"],
  },
  resolve: {
    alias: {
      "@": "/src",
      utils: "@/utils",
      state: "@/state",
      pages: "@/pages",
      config: "@/config",
      routes: "@/routes",
      styles: "@/styles",
      service: "@/service",
      components: "@/components",
    },
  },
});
