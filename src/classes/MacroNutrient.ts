import { type MN } from "@/interfaces/IMacroNutrientValues";
import { Composite } from "./Composite";
import type { IImutable } from "@/interfaces/IImmutable";

abstract class MacroNutrient
extends Composite<MacroNutrient>
implements IImutable<number> {
  abstract _energyPerGram: number
  abstract _type: MN; 
  private _value: number
  
  constructor(value: number) {
    super()
    this._value = value
  }

  get value(): number {
    return this._value
  }

  getEnergy(): number {
      return this._energyPerGram * this._value
  }

  getName(): string {
      return this._type
  }

}

class Fats extends MacroNutrient {
  _energyPerGram: number = 9.3;
  _type: MN = 'fats';
}

class Proteins extends MacroNutrient {
  _energyPerGram: number = 4.2;
  _type: MN = 'proteins';
}


class Carbohydrates extends MacroNutrient {
  _energyPerGram: number = 4.2;
  _type: MN = 'carbohydrates';
}

export { Fats, Proteins, Carbohydrates, MacroNutrient }