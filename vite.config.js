// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/http://www.dcoapi.somee.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Elimina el prefijo /api en las solicitudes
        secure: false,
      },
    },
  },
});

