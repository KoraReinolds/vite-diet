import { Composite } from "./Composite";
import type { Dish } from "./Dish";
import type { Food } from "./Food";
import type { IDietPlanParams } from "@/interfaces/IDietPlanParams";

class DietPlan
extends Composite<Food | Dish> {
  
  constructor({ food }: IDietPlanParams) {
    super()
    food.forEach((f) => this.add(f))
  }
  
  getName(): string {
    return 'DietPlan'
  }
}

export { DietPlan }