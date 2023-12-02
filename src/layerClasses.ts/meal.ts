import type { Food } from "@/classes/Food";
import models from "@/layerInstances/models";
import { addItem, getAllItems, getItemByName, removeItemByName } from "@/layerUtils/composite";
import { NEW_MEAL_NAME } from "@/layerUtils/constants";

function isNewMealName(mealName: string) {
  return mealName === NEW_MEAL_NAME
}

function getMealByMealName(mealName: string) {
  return getItemByName(models.dietPlan, mealName)  
}

function addFoodByMealName(food: Food | undefined, mealName: string) {
  const meal = getMealByMealName(mealName)
  if (!meal || !food) return false
  addItem(meal, food)
  return true
}

function removeFoodByMealName(mealName: string, foodName: string) {
  const meal = getMealByMealName(mealName)
  if (meal) {
    return removeItemByName(meal, foodName)
  }
}

function getFoodListByMealName(mealName: string) {
  const meal = getMealByMealName(mealName)
  if (!meal) return []
  return getAllItems(meal)
}

export {
  getFoodListByMealName,
  isNewMealName,
  addFoodByMealName,
  removeFoodByMealName,
}