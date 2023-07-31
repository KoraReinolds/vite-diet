import type { IMutable } from "@/interfaces/IMutable";
import { Composite } from "./Composite";
import { Carbohydrates, Fats, Proteins, type ImmutableMacroNutrient } from "./MacroNutrient";
import type { IFoodParams } from "@/interfaces/IFoodParams";
import type { MN } from "@/interfaces/IMacroNutrientValues";

class Food
extends Composite<ImmutableMacroNutrient>
implements IMutable<number> {
  name: string
  private _value: number 
  
  constructor({ name, chunk = 100, value = 100, fats, carbohydrates, proteins }: IFoodParams) {
    super()
    this.name = name
    this._value = value
    this.chunk = chunk
    this.add(new Fats(fats))
    this.add(new Carbohydrates(carbohydrates))
    this.add(new Proteins(proteins))
  }
  
  getEnergy(): number {
    return this.value * super.getEnergy() / this.chunk
  }
  
  getMacronutrient(mn: MN): number {
    return this.value * super.getMacronutrient(mn) / this.chunk
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