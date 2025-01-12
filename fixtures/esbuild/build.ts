import { build } from 'esbuild'
import Exports from 'unplugin-exports/esbuild'

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  plugins: [
    Exports(),
  ],
  format: 'esm',
})
