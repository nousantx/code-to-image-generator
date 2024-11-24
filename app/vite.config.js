import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'node:path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './')
    }
  }
})
