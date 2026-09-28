import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/faex-git-lab/',
  plugins: [react()],
  build: {
    outDir: 'dist-pages',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        portal: path.resolve(rootDir, 'index.html'),
        gitLab: path.resolve(rootDir, 'git-lab/index.html'),
      },
    },
  },
});
