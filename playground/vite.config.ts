import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Exports from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Exports(),
  ],
})
