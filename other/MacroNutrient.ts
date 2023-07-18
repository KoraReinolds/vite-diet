import { computed, ref, type ComputedRef, type Ref } from "vue"
import type { NutritionRange } from "./Range"

interface IMacroNutrient {
  name: string
  setNutrientValue(value: number): boolean
  nutrientValue: ComputedRef<number>
  getDayLimit(weight: number): number
  getDayEnergyLimit(weight: number): number
}
class MacroNutrient implements IMacroNutrient {
  
  constructor(name: string, range: NutritionRange, energy: number) {
    this.name = name
    this._nutrientRange = range
    this._nutrientValue = ref(range.max)
    this._energy = energy
  }

  private _nutrientRange: NutritionRange
  private _nutrientValue: Ref<number>
  private _energy: number
  name: string
  
  setNutrientValue(value: number) {
    if (value >= this._nutrientRange.min && value <= this._nutrientRange.max) {
      this._nutrientValue.value = value
      return true
    }
    return false
  }
  
  nutrientValue = computed(() => {
    return this._nutrientValue.value
  })
  

  getDayLimit(weight: number) {
    return this._nutrientValue.value * weight
  }

  getDayEnergyLimit(weight: number) {
    return this._nutrientValue.value * weight * this._energy
  }

}

export { MacroNutrient }