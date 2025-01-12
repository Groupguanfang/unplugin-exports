import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import path from 'node:path'
import fg from 'fast-glob'
import MagicString from 'magic-string'
import { parseSync } from 'oxc-parser'
import { createUnplugin } from 'unplugin'
import { walkTopLevelGlobAllByOxc } from './core/ast'

function parseFilePath(id: string, removeExt: boolean = true): string {
  if (!id.startsWith('/') && !id.startsWith('..') && !id.startsWith('./'))
    id = `./${id}`

  // remove the file extension
  if (removeExt)
    id = id.replace(/\.[^.]+$/, '')

  return id
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = () => {
  return {
    name: 'unplugin-exports',
    enforce: 'pre',
    transform(code, id) {
      const { program } = parseSync(id, code)
      const ms = new MagicString(code)

      walkTopLevelGlobAllByOxc(program, (node) => {
        ms.remove(node.start, node.end)
        const files = fg.sync(node.patterns, {
          cwd: path.dirname(id),
          ignore: [id],
        })
        for (const file of files) {
          const filePath = parseFilePath(file)
          this.addWatchFile(filePath)
          ms.appendRight(node.start, `\nexport * from '${filePath}';\n`)
        }
      })

      return ms.toString()
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
