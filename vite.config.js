import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Markdown from 'vite-plugin-md'

export default defineConfig({
  plugins: [
    react(),
    Markdown({
      markdownItOptions: {
        html: true,
      }
    })
  ],
})