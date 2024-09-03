import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://paytm-clone-08ur.onrender.com",
        // target: "http://localhost:3000",
        changeOrigin: true,
        secure: false, // Optional: set to false if your backend uses self-signed certificates
      },
    },
  },
});
