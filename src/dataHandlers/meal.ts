import { computed, ref, watch } from "vue"
import type { Food } from "@/classes/Food"
import { dietPlan } from "./dietPlanInstance"
import type { IMealInfoData } from "@/interfaces/ITable"

const mealName = ref('')
function setMealName(name: string) {
  mealName.value = name
}
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
const mealFoodNamesList = computed(() => mealFoodList.value.map(food => food.name))

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

const mealData = computed<IMealInfoData[]>(() => {
  return mealFoodList.value.map(food => ({
    name: food.name,
    chunks: food.chunks.toFixed(0),
    kcal: food.getEnergy().toFixed(1),
    proteins: food.proteins.toFixed(1),
    fats: food.fats.toFixed(1),
    carbohydrates: food.carbohydrates.toFixed(1),
  }))
})

export {
  meal,
  mealName,
  setMealName,
  setNewMealName,
  clearName,
  addFood,
  removeFood,
  mealFoodList,
  mealFoodNamesList,
  newMeal,
  mealData,
}
