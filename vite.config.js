import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Inline empty PostCSS config → stops Vite from walking up and
  // picking up the parent Next.js project's postcss.config.mjs
  css: {
    postcss: {},
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
  },
})
