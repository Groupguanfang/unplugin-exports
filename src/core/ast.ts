import type * as oxc from 'oxc-parser'

function typeAssert<T>(node: unknown): asserts node is T {}

export interface SourceLocation {
  start: number
  end: number
}

export interface WalkerInfo extends SourceLocation {
  patterns: string[]
}

export function walkTopLevelGlobAllByOxc(ast: oxc.Program, walker: (info: WalkerInfo) => void): void {
  for (const node of ast.body) {
    if (node.type !== 'ExpressionStatement')
      continue
    if (node.expression.type !== 'CallExpression')
      continue
    if (node.expression.callee.type !== 'StaticMemberExpression')
      continue
    if (node.expression.callee.object.type !== 'Identifier')
      continue
    if (node.expression.callee.property.type !== 'Identifier')
      continue
    if (node.expression.callee.object.name !== 'exporter')
      continue
    if (node.expression.callee.property.name !== 'globAll')
      continue

    typeAssert<oxc.ExpressionStatement & SourceLocation>(node)
    const pattern = node.expression.arguments[0]
    typeAssert<oxc.StringLiteral | oxc.ArrayExpression>(pattern)

    walker({
      start: node.start,
      end: node.end,
      patterns: pattern.type === 'Literal'
        ? [pattern.value as string]
        : pattern.elements.map((element) => {
            typeAssert<oxc.StringLiteral>(element)
            return element.value as string
          }),
    })
  }
}
