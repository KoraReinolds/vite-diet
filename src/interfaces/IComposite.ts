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
  add(component: T): T 
  remove(name: string): boolean
}

interface ICompositeFixedValue<T extends IImmutableComposite<any>>
extends IImmutableComposite<T>, IMutableChilds<T> {}

interface IComposite<T extends ICompositeFixedValue<any>>
extends ICompositeFixedValue<T>, IMutable<number> {}

export type { IComposite, IImmutableComposite, IMutableChilds, ICompositeFixedValue }