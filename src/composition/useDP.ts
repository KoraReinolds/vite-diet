import type { IDietPlan } from "@/interfaces/IDietPlan"
import { PFCRatio, type PFC } from "@/interfaces/PFC"
import { computed, ref, watch } from "vue"

const useDP = (dp: IDietPlan) => {

  const curentEnergy = computed(() => +dp.getEnergy().toFixed(0) || 0)
  const totalEnergy = ref(`${dp.kcal}`)
  const pfcRatio = ref(dp.pfcRatio)
  const normilizePFC = (pfc: PFC) => {
    return new PFCRatio(pfc).normilize()
  }
  const actualPFC = computed(() => {
    const ratio = curentEnergy.value / +totalEnergy.value
    const pfc = normilizePFC({
      proteins: dp.proteins,
      fats: dp.fats,
      carbohydrates: dp.carbohydrates,
    })
    pfc.proteins *= ratio
    pfc.carbohydrates *= ratio
    pfc.fats *= ratio
    return pfc
  })
  const meals = computed(() => dp.getAllList())
  const mealCount = computed(() => meals.value.length)

  watch(totalEnergy, (value: string) => {
    dp.kcal = +value
  })
 
  watch(pfcRatio, (value: PFC) => {
    dp.pfcRatio = normilizePFC(value)
  })
  
  return { curentEnergy, totalEnergy, pfcRatio, actualPFC, mealCount, meals } 
}

export { useDP }