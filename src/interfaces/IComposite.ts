import type { IEnergy } from "./IEnergy"
import type { IHasMacronutrients } from "./IHasMacronutrients"
import type { IChunks } from "./IChunks"
import type { IMutable } from "./IMutable"

interface IImmutableComposite<T extends IImmutableComposite<any>>
extends IEnergy, IHasMacronutrients, IChunks {
  get(name: string): T | undefined
  name: string
  getAllList(): T[]
}

interface IMutableChilds<T extends IImmutableComposite<any>> {
  add(component: T): void
  remove(name: string): boolean
}

interface IComposite<T extends IImmutableComposite<any>>
extends IImmutableComposite<T>, IMutable<number>, IMutableChilds<T> {}

export type { IComposite, IImmutableComposite, IMutableChilds }