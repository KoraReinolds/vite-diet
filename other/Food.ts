import type { IMacroNutrientValues } from "../interfaces/IMacroNutrientValues"
import type { MacroNutrient } from "./MacroNutrient"

interface IFood {
  name: string
}

interface IFoodParams extends IFood, IMacroNutrientValues {
  bfc: [number, number, number]
}

class Food implements IFood {
  macroNutrients: MacroNutrient[]
  name: string

  constructor(params: IFoodParams) {
    this.name = params.name
    this.macroNutrients = [
      new MacroNutrient('prots', params.bfc[0])
    ]
  }
}

export { Food }