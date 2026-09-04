import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site needs the repo name as base path
const githubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: githubPages ? '/ComputerGeek-Academy/' : '/',
});
