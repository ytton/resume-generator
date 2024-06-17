import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
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
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'src/assets/**/*', dest: '/assets' } // 将 src/assets 目录下的所有内容复制到 dist/assets
      ]
    }),
    react({
      babel: {
        presets: ['jotai/babel/preset']
      }
    })
  ]
})
