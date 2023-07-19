import { Composite } from "./Composite";
import { Carbohydrates, Fats, Proteins, type MacroNutrient } from "./MacroNutrient";
import type { IDietPlanParams } from "@/interfaces/IDietPlanParams";

class DietPlan
extends Composite<MacroNutrient> {
  
  constructor({ fats, carbohydrates, proteins }: IDietPlanParams) {
    super()
    this.add(new Fats(fats))
    this.add(new Carbohydrates(carbohydrates))
    this.add(new Proteins(proteins))
  }
  
  getName(): string {
    return 'DietPlan'
  }
}

export { DietPlan }