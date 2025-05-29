// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js', // Explicitly link to PostCSS config for Tailwind
  },
  base: '/', // Default base path, adjust if deploying to a subdirectory
  server: {
    port: 5173, // Default dev server port
    open: true, // Automatically open browser on start
  },
});