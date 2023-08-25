import { ImmutableCompositeWithMutableValue } from "./Composite";
import { Carbohydrates, Fats, Proteins, MacroNutrient } from "./MacroNutrient";
import type { IFoodParams } from "@/interfaces/IFoodParams";

class Food
extends ImmutableCompositeWithMutableValue<MacroNutrient> {
  
  constructor(foodParams: IFoodParams) {
    const { fats, carbohydrates, proteins } = foodParams
    super({
      ...foodParams,
      chunks: (foodParams.chunks || 100) / (foodParams.chunkSize || 1),
      childs: [
        new Fats(fats),
        new Carbohydrates(carbohydrates),
        new Proteins(proteins),
      ]
    })
  }
}

export { Food }