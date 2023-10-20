import type { DietPlan } from "@/classes/DietPlan"
import { PFCRatio, type PFC } from "@/interfaces/PFC"
import { computed, ref, watch } from "vue"

const useDP = (dp: DietPlan) => {

  const curentEnergy = computed(() => dp.getEnergy().toFixed(0) || 0)
  const totalEnergy = ref(dp.kcal || 0)
  const pfcRatio = ref(dp.pfcRatio)
  
  watch(totalEnergy, (value: number) => {
    dp.kcal = value
  })
 
  watch(pfcRatio, (value: PFC) => {
    dp.pfcRatio = new PFCRatio(value).normilize()
  })

  return { curentEnergy, totalEnergy, pfcRatio } 
}

export { useDP }