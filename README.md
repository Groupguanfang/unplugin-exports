# unplugin-exports

[![NPM version](https://img.shields.io/npm/v/unplugin-exports?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-exports)

Add export macros in your project with unplugin. Most of time when you develop a library, you need add a lot of `export * from './xxx'` statements in your `index.ts` file, it is very annoying, this plugin can help you to add these statements by glob patterns.

When you use this plugin, you can use `exporter.globAll` to add export statements by glob patterns, like this:

```ts
// index.ts
exporter.globAll(['./**/*.ts'])
```

It will automatically exclude the `index.ts` file itself, and you can use `!` to exclude some files.

```ts
// index.ts
exporter.globAll(['./**/*.ts', '!some-you-dont-want-to-export-file.ts'])
```

> I've had enough of writing "export * from './xxx'", really going crazy...

This `exporter.globAll` function just can be used top level in a file, cannot be used in a function or other block.

```ts
// index.ts
function foo() {
  // ❌ This is not allowed, will throw runtime error because of the `exporter` is not defined!
  exporter.globAll(['./**/*.ts'])
}
```

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
