interface ISelected<T> {
  selected: string[]
  getSelected(): (T | undefined)[]
  setSelected(list: string[]): void
  selectAll(): void
}

export type { ISelected }