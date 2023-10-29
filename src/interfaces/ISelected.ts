interface ISelected<T> {
  selected: Record<string, boolean>
  getSelected(): T[]
  selectAll(): void
  select(name: string): void
  setSelected(obj: Record<string, boolean>): void
}

export type { ISelected }