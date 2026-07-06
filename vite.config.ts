/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  // Relative base so the build works both at a project-page URL
  // (tomplum.github.io/profile/) and at the custom-domain root, unchanged.
  base: './',
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}']
  }
})
