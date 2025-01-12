import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import path from 'node:path'
import fg from 'fast-glob'
import MagicString from 'magic-string'
import { createUnplugin } from 'unplugin'
import { walkTopLevelGlobAll } from './core/ast'

function parseFilePath(id: string): string {
  if (!id.startsWith('/') && !id.startsWith('..') && !id.startsWith('./'))
    return `./${id}`
  return id
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = () => {
  return {
    name: 'unplugin-exports',
    transform(code, id) {
      const ast = this.parse(code)
      const ms = new MagicString(code)

      walkTopLevelGlobAll(ast, (node) => {
        ms.remove(node.start, node.end)
        const files = fg.sync(node.patterns, {
          cwd: path.dirname(id),
          ignore: [id],
        })
        for (const file of files) {
          const filePath = parseFilePath(file)
          this.addWatchFile(filePath)
          ms.appendRight(node.start, `export * from '${filePath}';\n`)
        }
      })

      return ms.toString()
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
