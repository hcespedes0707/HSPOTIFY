// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
   // Define la raíz como el directorio del proyecto
   server: {
    port: 5173, // Cambia este puerto si necesitas otro
  },
  });
