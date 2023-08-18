import type { AComposite } from "@/classes/Composite"
import type { IChunksParams } from "./IChunks"
import type { IHasName } from "./IHasName"

interface ILeafParams extends IChunksParams, IHasName {
  energyPerGram: number
}

interface ICompositeParams<T extends AComposite<any>>
extends Omit<ILeafParams, 'energyPerGram'> {
  childs: T[]
}

export type { ICompositeParams, ILeafParams }