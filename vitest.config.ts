import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        // Generated shadcn UI primitives - excluded per specification rule
        "src/components/ui/**",
        // Interactive 2D/WebGL canvas scene requiring physical canvas rendering context;
        // pure math, particle configs, and state machines are extracted and tested separately
        "src/components/HeroCanvas.tsx",
        "**/*.d.ts",
        // Next.js metadata and edge-runtime image generators
        "src/app/layout.tsx",
        "src/app/opengraph-image.tsx",
        "src/app/twitter-image.tsx",
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
