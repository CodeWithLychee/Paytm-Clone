import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1": {
        target: "https://paytm-clone-qf5b.onrender.com/api",
        changeOrigin: true,
      },
    },
  },
});
