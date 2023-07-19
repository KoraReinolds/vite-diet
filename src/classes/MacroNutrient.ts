import { type MN } from "@/interfaces/IMacroNutrientValues";
import { Composite } from "./Composite";
import type { IMutable } from "@/interfaces/IMutable";
import type { IImmutable } from "@/interfaces/IImmutable";

abstract class ImmutableMacroNutrient
extends Composite<ImmutableMacroNutrient>
implements IImmutable<number> {
  abstract _energyPerGram: number
  abstract _type: MN; 
  protected _value: number
  
  constructor(value: number) {
    super()
    this._value = value
  }

  get value() {
    return this._value
  }

  getEnergy(): number {
    return this._energyPerGram * this._value
  }

  getName(): string {
    return this._type
  }

}

abstract class MacroNutrient
extends ImmutableMacroNutrient
implements IMutable<number> {
  set(value: number) {
    this._value = value
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

export {
  Fats,
  Proteins,
  Carbohydrates,
  MacroNutrient,
  ImmutableMacroNutrient,
}