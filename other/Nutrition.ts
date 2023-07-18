import { MacroNutrient } from "./MacroNutrient"
import type { BodyParams } from "./BodyParams"
import { computed, type ComputedRef } from "vue"

interface INutrition {
  body: BodyParams
  macroNutrients: MacroNutrient[]
  dayLimits: ComputedRef<number[]>
  dayLimitsPercent: ComputedRef<number[]>
  totalDayLimit: ComputedRef<number>
}

class Nutrition implements INutrition {
  constructor(body: BodyParams) {
    this.body = body

    this.macroNutrients = [
      new MacroNutrient('prots', { min: 1, max: 2 }, 4.2),
      new MacroNutrient('fats', { min: 0.7, max: 1 }, 9.3),
      new MacroNutrient('carbs', { min: 4, max: 5 }, 4.2)
    ]
  }

  body: BodyParams
  macroNutrients: MacroNutrient[]

  dayLimits = computed(() => {
    return this.macroNutrients.map(mn =>
      mn.nutrientValue.value * this.body.weight.value
    ) 
  })
  
  dayEnergyLimits = computed(() => {
    return this.macroNutrients.map(mn => 
      mn.getDayEnergyLimit(this.body.weight.value)
    ) 
  })

  
  dayLimitsPercent = computed(() => {
    return this.dayLimits.value.map(v => 
      +(v / this.totalDayLimit.value * 100).toFixed(1)
    ) 
  })

  totalDayLimit = computed(() => {
    return this.dayLimits.value.reduce((p,c) => +(p + c).toFixed(1))
  })
  
  dayEnergyLimitsPercent = computed(() => {
    return this.dayEnergyLimits.value.map(v => 
      (v / this.totalDayEnergyLimit.value * 100).toFixed(1)
    ) 
  })

  totalDayEnergyLimit = computed(() => {
    return +this.dayEnergyLimits.value.reduce((p,c) => p + c).toFixed(1)
  })
}

export { Nutrition }