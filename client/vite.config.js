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
  server: {
    proxy: {
      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      '/api/v1': 'http://localhost:3000/api/v1'
    }
  }
});

