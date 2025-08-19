import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// removed lovable-tagger to keep the project a pure React + Vite setup

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // add other plugins here if needed
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
