import type { IMutable } from "@/interfaces/IMutable";
import { Composite } from "./Composite";
import { ImmutableCarbohydrates, ImmutableFats, ImmutableProteins, type ImmutableMacroNutrient } from "./MacroNutrient";
import type { IFoodParams } from "@/interfaces/IFoodParams";

class Food
extends Composite<ImmutableMacroNutrient>
implements IMutable<number> {
  name: string
  private _value: number 
  
  constructor({ name, value = 100, fats, carbohydrates, proteins }: IFoodParams) {
    super()
    this.name = name
    this._value = value
    this.add(new ImmutableFats(fats))
    this.add(new ImmutableCarbohydrates(carbohydrates))
    this.add(new ImmutableProteins(proteins))
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