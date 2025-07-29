import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // 개발 서버 설정
  server: {
    port: 3000,
    open: true,
  },

  // 빌드 설정
  build: {
    outDir: 'dist',
    sourcemap: true,
  },

  // 테스트 설정
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
  },
});
