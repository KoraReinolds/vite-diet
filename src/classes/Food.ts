import type { IMutable } from "@/interfaces/IMutable";
import { Composite } from "./Composite";
import type { MacroNutrient } from "./MacroNutrient";
import type { IFoodParams } from "@/interfaces/IFoodParams";

class Food
extends Composite<MacroNutrient>
implements IMutable<number> {
  name: string
  _value: number = 100

  constructor({ name, value = 100, fats, carbohydrates, proteins }: IFoodParams) {
    super()
    this.name = name
    this._value = value
    this.add(fats)
    this.add(carbohydrates)
    this.add(proteins)
  }
  
  getEnergy(): number {
    return this.value * super.getEnergy() / 100
  }

  get value(): number {
    return this._value
  }

  set(value: number) {
    this._value = value
  }

  getName(): string {
    return this.name
  }
}

export { Food }