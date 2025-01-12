export function foo(): string {
  return 'bar'
}

export function bar(): string {
  return 'foo'
}

export function baz(): string {
  return foo()
}
