import { useReactive } from "@/composables/useReactive";
import dietPlan from "@/layerClasses.ts/dietPlan"
import { resultData } from "./result";
import { mealNamesList } from "./mealsList";
import { computed } from "vue";

const totalEnergy = useReactive(
  dietPlan.getTotalEnergy,
  dietPlan.setTotalEnergy
)

const curentEnergy = computed(() => {
  resultData.value
  mealNamesList.value // recalculates when clearMealsSection() call 
  return +dietPlan.getCurentEnergy().toFixed(0) || 0
})

export {
  totalEnergy,
  curentEnergy,
}