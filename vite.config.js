import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1000, // Increase chunk size limit to avoid warnings
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        src: 'manifest.json',
      },
    }),
  ],
});
