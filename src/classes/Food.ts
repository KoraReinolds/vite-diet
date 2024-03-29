import { ImmutableCompositeWithMutableValue } from "./Composite";
import { Carbohydrates, Fats, Proteins, AMacroNutrient } from "./MacroNutrient";
import type { IFoodParams } from "@/interfaces/IFoodParams";
import type { IPer100Chunks } from "@/interfaces/IChunks";
import type { IPrototype } from "@/interfaces/IPrototype";

class Food
extends ImmutableCompositeWithMutableValue<AMacroNutrient>
implements IPer100Chunks, IPrototype<Food> {
 
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
      proteins: this.proteinsChunkPer100,
      fats: this.fatsChunkPer100,
      carbohydrates: this.carbohydratesChunkPer100,
      chunks: this.chunks,
      name: this.name,
    }) 
  }

}

export { Food }