import type { DietPlan } from "@/classes/DietPlan"
import { computed, ref, watch } from "vue"

const useKcal = (dp: DietPlan) => {

  const curentEnergy = computed(() => dp.getEnergy().toFixed(0) || 0)
  const totalEnergy = ref(dp.kcal || 0)
  
  watch(totalEnergy, (value: number) => {
    dp.kcal = value
  })

  return { curentEnergy, totalEnergy } 
}

export { useKcal }