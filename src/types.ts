export interface Options {
  // define your plugin options here
}

declare global {
  export interface Exporter {
    /**
     * Generate a list of `export * from ...` statements for the given pattern.
     *
     * @example
     * If your project structure is like this:
     *
     * ```bash
     * src/
     *  ├── foo.ts
     *  ├── bar.ts
     *  ├── baz.ts
     *  └── index.ts
     * ```
     * You can use `exporter.globAll('./*.ts')` in `index.ts` to generate:
     *
     * ```ts
     * export * from './foo'
     * export * from './bar'
     * export * from './baz'
     * ```
     *
     * @param pattern - The pattern to match files.
     */
    globAll: (pattern: string[] | string) => void
  }

  // eslint-disable-next-line vars-on-top, no-var
  var exporter: Exporter
}
