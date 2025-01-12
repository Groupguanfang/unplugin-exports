import type { Options as TsupOptions } from 'tsup'
import type { createVitePlugin, UnpluginBuildContext, UnpluginContext, UnpluginOptions } from 'unplugin'
import type { Options } from './types'
import { unpluginFactory } from '.'
import Exports from './esbuild'

type ArrayItem<T extends any[]> = T[number]

export default function (options: Options | undefined): ArrayItem<Exclude<TsupOptions['plugins'], undefined>> {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const result = unpluginFactory(options, undefined) as UnpluginOptions

  return {
    name: result.name,
    esbuildOptions(options) {
      if (!options.plugins)
        options.plugins = []
      options.plugins.push(Exports())
    },

    async renderChunk(code, chunkInfo) {
      if (result.transform) {
        const transfomResult = await result.transform.call({
          addWatchFile: () => {},
          emitFile: () => {},
          getWatchFiles: () => [],
          parse: (() => {}) as unknown as UnpluginBuildContext['parse'],
          warn: () => {},
          error: () => {},
        }, code, chunkInfo.path)

        if (typeof transfomResult === 'string')
          return { code: transfomResult }
        else return transfomResult
      }
    },
  }
}
