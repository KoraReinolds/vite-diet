interface ISelected<T> {
  selected: Record<string, boolean>
  getSelected(): T[]
  selectAll(): void
}

export type { ISelected }