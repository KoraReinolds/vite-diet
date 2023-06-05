import { Composite } from "./Composite";
import type { Carbohydrates, Fats, MacroNutrient, Proteins } from "./MacroNutrient";

class Food extends Composite<MacroNutrient> {
  name: string

  constructor(name: string, nutrients: [Proteins, Fats, Carbohydrates]) {
    super()
    this.name = name
    for (const nutrient of nutrients) {
      this.add(nutrient)
    }
  }

  getName(): string {
    return this.name
  }
}

export { Food }