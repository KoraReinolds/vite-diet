import { ref, watch } from "vue"
import dietPlan from "@/layerClasses.ts/dietPlan"
import { mealName } from "./mealName"

const mealData = ref(dietPlan.getMealInfoDataByName(mealName.value))

watch(mealName, () => mealData.value = dietPlan.getMealInfoDataByName(mealName.value))

function addFood(name: string) {
  dietPlan.addFoodByName(mealName.value, name)
  mealData.value = dietPlan.getMealInfoDataByName(mealName.value)
}

function removeFood(name: string) {
  dietPlan.removeFoodByName(mealName.value, name)
  mealData.value = dietPlan.getMealInfoDataByName(mealName.value)
}

export {
  addFood,
  removeFood,
  mealData,
}
