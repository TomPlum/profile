/// <reference types="vitest/config" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  // Relative base so the build works both at a project-page URL
  // (tomplum.github.io/profile/) and at the custom-domain root, unchanged.
  base: './',
  plugins: [react(), vanillaExtractPlugin()],
  build: {
    rollupOptions: {
      // Two real documents rather than a router: the shelf is a separate page
      // with its own bundle, so the home page never downloads 232 books.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        books: resolve(import.meta.dirname, 'books.html')
      }
    }
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}']
  }
})
