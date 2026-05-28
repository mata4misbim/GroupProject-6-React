import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      'prop-types': fileURLToPath(new URL('./src/shop/propTypesShim.js', import.meta.url)),
    },
    preserveSymlinks: true,
  },
})
