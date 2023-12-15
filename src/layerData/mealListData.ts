import { DietPlan } from "@/classes/DietPlan"
import mealList from "@/layerClasses.ts/mealList"
import { computed, ref } from "vue"
import type { Meal } from "@/classes/Meal"
import type { IMealData } from "@/interfaces/IData"
import utilsData from "@/layerUtils/utilsData"

function getMealDataFromMeal(meal: Meal): IMealData {
  return {
    proteins: meal.proteins,
    carbohydrates: meal.carbohydrates,
    fats: meal.fats,
    energy: meal.getEnergy(),
    name: meal.name,
  }
}

const allMealsData = ref(getMealData())

function getMealData() {
  return utilsData.listToData(
    mealList.getMealList(),
    getMealDataFromMeal
  )
}

const createdMealsData = computed(() =>
  allMealsData.value
    .filter(meal => meal.name !== DietPlan.NEW_MEAL_NAME)
)

function reloadMealData() {
  allMealsData.value = getMealData()
}

function saveNewMeal() {
  mealList.saveNewMeal()
  reloadMealData()
}

function clearMealList() {
  mealList.removeMeals()
  reloadMealData()
} 

export default {
  getMealData,
  reloadMealData,
  clearMealList,
  createdMealsData,
  saveNewMeal,
}
