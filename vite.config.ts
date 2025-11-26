import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 关键配置：确保资源在子路径下也能加载
  build: {
    outDir: 'dist',
  },
});