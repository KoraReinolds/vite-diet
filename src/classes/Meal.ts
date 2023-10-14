import { CompositeWithFixedValue } from "./Composite";
import type { Food } from "./Food";
import type { IMealParams } from "@/interfaces/IMealParams";

class Meal
extends CompositeWithFixedValue<Food> {
 
  protected _defaultSize: number = 1;

  constructor(mealParams: IMealParams = {}) {
    super({
      childs: [],
      chunks: 1,
      name: 'newMeal',
      ...mealParams,
    })
  }

}

export { Meal }