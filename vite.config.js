import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Markdown from 'vite-plugin-md'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    Markdown({
      markdownItOptions: {
        html: true,
      }
    }),
    tailwindcss(),
  ],
})