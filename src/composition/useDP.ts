import type { DietPlan } from "@/classes/DietPlan"
import { PFCRatio, type PFC } from "@/interfaces/PFC"
import { computed, ref, watch } from "vue"

const useDP = (dp: DietPlan) => {

  const curentEnergy = computed(() => dp.getEnergy().toFixed(0) || 0)
  const totalEnergy = ref(dp.kcal || 0)
  const pfcRatio = ref(dp.pfcRatio)
  const normilizePFC = (pfc: PFC) => {
    return new PFCRatio(pfc).normilize()
  }
  const actualPFC = ref(normilizePFC({
    proteins: dp.proteins,
    fats: dp.fats,
    carbohydrates: dp.carbohydrates,
  }))

  watch(totalEnergy, (value: number) => {
    dp.kcal = value
  })
 
  watch(pfcRatio, (value: PFC) => {
    dp.pfcRatio = normilizePFC(value)
  })
  
  return { curentEnergy, totalEnergy, pfcRatio, actualPFC } 
}

export { useDP }