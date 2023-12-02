import { CompositeWithFixedValue } from "./Composite";
import { DietPlan } from "./DietPlan";
import type { Food } from "./Food";
import type { IMealParams } from "@/interfaces/IMealParams";

class Meal
extends CompositeWithFixedValue<Food> {
 
  protected _defaultSize: number = 1;

  constructor(mealParams: IMealParams = {}) {
    super({
      childs: [],
      chunks: 1,
      name: DietPlan.NEW_MEAL_NAME,
      ...mealParams,
    })
  }
  
  rename(name: string) {
    this._name = name
  }

}

export { Meal }