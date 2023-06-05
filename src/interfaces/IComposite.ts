import type { Composite } from "@/classes/Composite"

interface IComposite<T extends Composite<T>> {
  add(component: T): void
  get(name: string): T | undefined
  remove(name: string): boolean
  getName(): string
}

export type { IComposite }