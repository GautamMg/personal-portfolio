import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    // Force Vite to pre-bundle react-globe.gl and three.js together so they
    // resolve to one instance — avoids hundreds of individual ESM file requests.
    include: ['react-globe.gl', 'three'],
  },
})
