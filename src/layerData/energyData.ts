import { useReactive } from "@/composables/useReactive"
import { getCurentEnergy, getTotalEnergy, setTotalEnergy } from "@/layerClasses.ts/energy"
import { resultData } from "@/layerUI/result"
import { computed } from "vue"
import mealListData from "./mealListData"

const totalEnergy = useReactive(
  getTotalEnergy,
  setTotalEnergy
)

const curentEnergy = computed(() => {
  resultData.value
  mealListData.createdMealsData.value

  return +getCurentEnergy().toFixed(0) || 0
})


export {
  curentEnergy,
  totalEnergy,
}
