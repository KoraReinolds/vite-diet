import type { AComposite } from "@/classes/Composite"

interface IImmutableComposite<T extends AComposite<T>> {
  get(name: string): T | undefined
  name: string
  getAll(): Map<string, T>
  getAllList(): T[]
}

interface IComposite<T extends AComposite<T>> extends IImmutableComposite<T> {
  add(component: T): void
  remove(name: string): boolean
}

export type { IImmutableComposite, IComposite }