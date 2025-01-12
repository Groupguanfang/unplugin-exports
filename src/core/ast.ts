import type { ArrayExpression, ExpressionStatement, Literal, Program } from 'estree'
import type { AstNode } from 'rollup'

function typeAssert<T>(node: unknown): asserts node is T {}

export interface SourceLocation {
  start: number
  end: number
}

export interface WalkerInfo extends SourceLocation {
  patterns: string[]
}

export function walkTopLevelGlobAll(ast: AstNode, walker: (info: WalkerInfo) => void): void {
  if (ast.type !== 'Program')
    return
  typeAssert<Program>(ast)

  for (const node of ast.body) {
    if (node.type !== 'ExpressionStatement')
      continue
    if (node.expression.type !== 'CallExpression')
      continue
    if (node.expression.callee.type !== 'MemberExpression')
      continue
    if (node.expression.callee.object.type !== 'Identifier')
      continue
    if (node.expression.callee.property.type !== 'Identifier')
      continue
    if (node.expression.callee.object.name !== 'exporter')
      continue
    if (node.expression.callee.property.name !== 'globAll')
      continue

    typeAssert<ExpressionStatement & SourceLocation>(node)
    const pattern = node.expression.arguments[0]
    typeAssert<Literal | ArrayExpression>(pattern)

    walker({
      start: node.start,
      end: node.end,
      patterns: pattern.type === 'Literal'
        ? [pattern.value as string]
        : pattern.elements.map((element) => {
            typeAssert<Literal>(element)
            return element.value as string
          }),
    })
  }
}
