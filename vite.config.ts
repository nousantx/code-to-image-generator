import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'node:path'
import tenoxui from 'vite-plugin-tenoxui-beta'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(), tenoxui()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@tenoxui-lib': path.resolve(__dirname, './src/lib/tenoxui')
    }
  }
})
