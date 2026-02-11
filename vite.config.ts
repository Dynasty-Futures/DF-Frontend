import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy:
      mode === "development"
        ? {
            // Forward /v1/* requests to the local backend (avoids CORS in dev)
            "/v1": {
              target: "http://127.0.0.1:3000",
              changeOrigin: true,
            },
            // Forward health check endpoints to the local backend
            "/health": {
              target: "http://127.0.0.1:3000",
              changeOrigin: true,
            },
            "/ready": {
              target: "http://127.0.0.1:3000",
              changeOrigin: true,
            },
          }
        : undefined,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
