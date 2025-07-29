import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  // 절대 경로 import 설정
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // 개발 서버 설정
  server: {
    port: 3000,
    open: true,
  },

  // 빌드 설정
  build: {
    outDir: "dist",
    sourcemap: true,
  },

  // 테스트 설정
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    css: true,
  },
});
