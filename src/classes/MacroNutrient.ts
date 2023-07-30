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

  get proteins(): number {
    return 0
  }

  get carbohydrates(): number {
    return 0
  }

  get fats(): number {
    return 0
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
  setEnergy(value: number) {
    this._value = value / this._energyPerGram
  }
}

class Fats extends MacroNutrient {
  _energyPerGram: number = 9.3;
  _type: MN = 'fats';
  get fats(): number {
    return this._value
  }
}
class Proteins extends MacroNutrient {
  _energyPerGram: number = 4.2;
  _type: MN = 'proteins';
  get proteins(): number {
    return this._value
  }
}
class Carbohydrates extends MacroNutrient {
  _energyPerGram: number = 4.2;
  _type: MN = 'carbohydrates';
  get carbohydrates(): number {
    return this._value
  }
}

export {
  Fats,
  Proteins,
  Carbohydrates,
  MacroNutrient,
  ImmutableMacroNutrient,
}