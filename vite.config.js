// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // Vite kommer att bygga filerna till 'build' mappen som Electron förväntar sig.
  build: {
    outDir: 'build', 
  },
  // Bas-sökvägen måste vara relativ för att fungera i Electron
  base: './', 
});