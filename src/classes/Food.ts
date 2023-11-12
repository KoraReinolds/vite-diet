import { PFCRatio, type PFC } from "@/interfaces/PFC";
import { ImmutableCompositeWithMutableValue } from "./Composite";
import { Carbohydrates, Fats, Proteins, MacroNutrient } from "./MacroNutrient";
import type { IFoodParams } from "@/interfaces/IFoodParams";
import type { IPer100Chunks } from "@/interfaces/IChunks";
import type { IPrototype } from "@/interfaces/IPrototype";

class Food
extends ImmutableCompositeWithMutableValue<MacroNutrient>
implements IPer100Chunks, IPrototype<Food> {
 
  pfcRatio: PFC

  constructor(foodParams: IFoodParams) {
    if (foodParams.chunks === undefined) {
      foodParams.chunks = 100
    }
    if (foodParams.chunkSize === undefined) {
      foodParams.chunkSize = 1
    }
    const { fats, carbohydrates, proteins } = foodParams
    super({
      ...foodParams,
      chunks: foodParams.chunks,
      childs: [
        new Fats(fats),
        new Carbohydrates(carbohydrates),
        new Proteins(proteins),
      ]
    })
    this.pfcRatio = new PFCRatio(foodParams).normilize() 
  }

  getEnergyPer100(): number {
    return this.getEnergyChunk() * this._defaultSize / this._chunkSize
  }

  get fatsChunkPer100(): number {
    return this.fatsChunk * this._defaultSize / this._chunkSize
  };
  
  get carbohydratesChunkPer100(): number {
    return this.carbohydratesChunk * this._defaultSize / this._chunkSize
  };

  get proteinsChunkPer100(): number {
    return this.proteinsChunk * this._defaultSize / this._chunkSize
  };
  
  clone() {
    return new Food({
      proteins: this.proteins,
      fats: this.fats,
      carbohydrates: this.carbohydrates,
      chunks: this.chunks,
      name: this.name,
    }) 
  }

}

export { Food }