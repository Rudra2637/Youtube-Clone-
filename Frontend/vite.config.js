import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '/api'), // keeps the path intact
//       },
//     },
//   },
//   plugins: [
//     react(),
//     tailwindcss()
//   ],
// });
