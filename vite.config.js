import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    allowedHosts: [
      "f480-80-239-189-51.ngrok-free.app",
      "https://vismon-backend.onrender.com/",
    ],
    host: true,
  },
});
