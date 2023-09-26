import type { PFC } from "@/interfaces/PFC";
import { ImmutableCompositeWithMutableValue } from "./Composite";
import { Carbohydrates, Fats, Proteins, MacroNutrient } from "./MacroNutrient";
import type { IFoodParams } from "@/interfaces/IFoodParams";

class Food
extends ImmutableCompositeWithMutableValue<MacroNutrient> {
 
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
    this.pfcRatio = this.normilizePFC() 
  }
}

export { Food }