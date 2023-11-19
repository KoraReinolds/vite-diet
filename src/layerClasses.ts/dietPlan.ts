import { DietPlan } from "@/classes/DietPlan";
import type { IDietPlan } from "@/interfaces/IDietPlan";
import { type PFC, PFCEnergyRatio } from "@/interfaces/PFC";
import foodList from "@/layerClasses.ts/foodList"
import food from "./food";
import { GreedySearch } from "@/classes/GreedySearch";
import { GraphNode } from "@/classes/GraphNode";
import { CREATED_FOOD_LIST_KEY } from "./constants";
import { Meal } from "@/classes/Meal";
import type { IFoodParams } from "@/interfaces/IFoodParams";

interface IStorageMealParams {
  name: string
  childs: IFoodParams[]
}
function isListOfMealParams(data: IStorageMealParams[]): data is IStorageMealParams[] {
  return Array.isArray(data)
    && data.every(mealParams => {
      return mealParams.name !== undefined
      && mealParams.childs !== undefined
      && foodList.isListOfFoodParams(mealParams.childs)
    }) 
}

function parseMealList(foodData: string) {
  try {
    const data = JSON.parse(foodData)

    if (isListOfMealParams(data)) {
      return data.map(({ name, childs }) => new Meal({
        name, childs: childs.map(food.createFood)
      }))
    }

    throw new Error()
  } catch {
    console.warn("Can't parse meal list data")
  }
}

const childs = parseMealList(
  localStorage.getItem(CREATED_FOOD_LIST_KEY) || ''
) || []

const dietPlanInstance: IDietPlan = new DietPlan({
  childs,
  pfcRatio: { proteins: 25, carbohydrates: 55, fats: 20 },
  kcal: 2500
})

function calculate(
  initState: Record<string, number> | undefined,
  maxState: Record<string, number> | undefined
) {
  const gs = new GreedySearch(
    new GraphNode(dietPlanInstance, initState, maxState)
  )
  return gs.search(0.01)
}

function getTotalEnergy() {
  return dietPlanInstance.kcal
}

function setTotalEnergy(value: number) {
  dietPlanInstance.kcal = value
}

function getPFCRatio() {
  return dietPlanInstance.pfcRatio
}

function setPFCRatio(value: PFC) {
  dietPlanInstance.pfcRatio = value
}

function getMeals() {
  return dietPlanInstance.getAllList()
}

function getCurentEnergy() {
  return dietPlanInstance.getEnergy()
}

function saveNewMeal() {
  return dietPlanInstance.addMeal()
}

function removeMealByName(name: string) {
  dietPlanInstance.remove(name)
}

function getMealByName(name: string) {
  return dietPlanInstance.get(name)
}

function removeAll() {
  getMeals()
    .map(meal => meal.name)
    .forEach(removeMealByName)
}

function getNewMeal() {
  return dietPlanInstance.getNewMeal()
}

function addFoodByName(mealName: string, name: string) {
  const food = foodList.getFoodByName(name)
  const meal = getMealByName(mealName)
  if (!food || !meal) return []
  meal.add(food)
  return getFoodListByMealName(mealName)
}

function removeFoodByName(mealName: string, name: string) {
  const meal = getMealByName(mealName)
  if (!meal) return []
  meal.remove(name)
  return getFoodListByMealName(mealName)
}

function getFoodListByMealName(name: string) {
  const meal = getMealByName(name)
  return meal?.getAllList() || [] 
}

function getMealInfoDataByName(name: string) {
  return getFoodListByMealName(name)
    .map(food.getFoodData)
}

function getMealEditableDataByName(name: string) {
  return getFoodListByMealName(name)
    .map(food.getMealEditalbeData)
}

function getFilledPFCRatio() {
  
  const pfcData: Record<string, Record<string, number>> = { proteins: {}, fats: {}, carbohydrates: {} } 

  getMeals().reduce((result, meal) => {
    Object.entries(new PFCEnergyRatio(meal).normilize())
      .forEach(([key, val]) =>
        result[key][meal.name] = val * meal.getEnergy() / getTotalEnergy()
      )
    return result
  }, pfcData)
  
  return Object.values(pfcData)

}

function getMealNamesList() {
  return getMeals().map(meal => meal.name)
}

function createdMeals() {
  return getMealNamesList().filter(name => name !== 'newMeal')
}

export default {
  parseMealList,
  calculate,
  createdMeals,
  getFilledPFCRatio,
  getMealEditableDataByName,
  getMealInfoDataByName,
  getFoodListByMealName,
  addFoodByName,
  removeFoodByName,
  getMealByName,
  getNewMeal,
  getTotalEnergy,
  setTotalEnergy,
  getPFCRatio,
  setPFCRatio,
  getMeals,
  getCurentEnergy,
  saveNewMeal,
  removeAll,
}