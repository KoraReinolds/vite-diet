import { ImmutableComposite } from "./Composite";
import type { ILeafParams } from "@/interfaces/ICompositeParams";

class MacroNutrient
extends ImmutableComposite<MacroNutrient> {
  protected _energyPerGram!: number;

  constructor({ chunks, energyPerGram, name }: ILeafParams) {
    super({ childs: [], chunks, name })
    this._energyPerGram = energyPerGram
  }
 
  get proteins(): number {
    return 0
  }

  get carbohydrates(): number {
    return 0
  }

  get fats(): number {
    return 0
  }

  getEnergy(): number {
    return this.getEnergyChunk() * this.chunks
  }
  
  getEnergyChunk(): number {
    return this._energyPerGram
  }

}

class Fats extends MacroNutrient {
  constructor(chunks: number) {
    super({ chunks, energyPerGram: 9.3, name: 'fats' })
  }
  get fats(): number {
    return this.chunks
  }
  get fatsChunk(): number {
    return 1
  }
}
class Proteins extends MacroNutrient {
  constructor(chunks: number) {
    super({ chunks, energyPerGram: 4.2, name: 'proteins' })
  }
  get proteins(): number {
    return this.chunks
  }
  get proteinsChunk(): number {
    return 1
  }
}
class Carbohydrates extends MacroNutrient {
  constructor(chunks: number) {
    super({ chunks, energyPerGram: 4.2, name: 'carbohydrates' })
  }
  get carbohydrates(): number {
    return this.chunks
  }
  get carbohydratesChunk(): number {
    return 1
  }
}

export {
  Fats,
  Proteins,
  Carbohydrates,
  MacroNutrient,
}