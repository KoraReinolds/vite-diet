interface IPrototype<T> {
  clone: () => T
}

export type { IPrototype }