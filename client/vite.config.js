import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  css: {
    postcss: 'postcss.config.js',
  },
  optimizeDeps: {
    include: ['@testing-library/jest-dom']
  },
  // server: {
  //   host: '0.0.0.0',
  //   port: 5173
  // }
});

