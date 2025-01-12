# unplugin-exports

[![NPM version](https://img.shields.io/npm/v/unplugin-exports?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-exports)

Add export macros in your project with unplugin.

## Install

```bash
npm i unplugin-exports
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Exports from 'unplugin-exports/vite'

export default defineConfig({
  plugins: [
    Exports({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Exports from 'unplugin-exports/rollup'

export default {
  plugins: [
    Exports({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-exports/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-exports/nuxt', { /* options */ }],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-exports/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Exports from 'unplugin-exports/esbuild'

build({
  plugins: [Exports()],
})
```

<br></details>
