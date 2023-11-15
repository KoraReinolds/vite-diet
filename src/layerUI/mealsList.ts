import { computed, ref } from "vue"
import dietPlan from "@/layerClasses.ts/dietPlan"

const mealNamesList = ref(dietPlan.createdMeals())
const mealsCount = computed(() => mealNamesList.value.length)

function saveNewMeal() {
  dietPlan.saveNewMeal()
  mealNamesList.value = dietPlan.createdMeals()
}

function clearMealList() {
  dietPlan.removeAll()
  mealNamesList.value = dietPlan.createdMeals()
} 

export {
  mealsCount,
  saveNewMeal,
  mealNamesList,
  clearMealList,
}
