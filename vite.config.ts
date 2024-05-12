import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/resume-generator/',
  resolve: {
    alias: {
      // 设置别名
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000 // 将端口号设置为 3000
  },
  plugins: [react()]
})
