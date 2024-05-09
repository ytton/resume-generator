import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000 // 将端口号设置为 3000
  },
  plugins: [react()]
});
