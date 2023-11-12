import { computed, ref, watch } from "vue"
import type { Food } from "@/classes/Food"
import { dietPlan } from "./dietPlanInstance"

const mealName = ref('')
const newMeal = ref(dietPlan.getNewMeal())
function setNewMealName() {
  if (mealName.value === 'newMeal') return
  dietPlan.getNewMeal()
  mealName.value = 'newMeal'
}
function clearName() { mealName.value = '' }

const meal = computed(() => dietPlan.get(mealName.value))
function getFoodList() {
  return meal.value?.getAllList() || []
}
const mealFoodList = ref(getFoodList())
watch(meal, () => mealFoodList.value = getFoodList())

function addFood(food: Food) {
  if (!meal.value) return
  meal.value.add(food)
  mealFoodList.value = getFoodList()
}

function removeFood(name: string) {
  if (!meal.value) return
  meal.value.remove(name)
  mealFoodList.value = getFoodList()
}

export {
  meal,
  mealName,
  setNewMealName,
  clearName,
  addFood,
  removeFood,
  mealFoodList,
  newMeal,
}
