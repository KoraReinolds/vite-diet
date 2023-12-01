import { DietPlan } from "@/classes/DietPlan";
import type { IDietPlan } from "@/interfaces/IDietPlan";
import { type PFC, PFCEnergyRatio } from "@/interfaces/PFC";
import foodList from "@/layerClasses.ts/foodList"
import food from "./food";
import { GreedySearch } from "@/classes/GreedySearch";
import { GraphNode } from "@/classes/GraphNode";
import { CREATED_FOOD_LIST_KEY } from "./constants";
import { Meal } from "@/classes/Meal";
import type { IMealEditableData, IMealInfoData, IProductData } from "@/interfaces/ITable";
import { getItemByName } from "./composition";

interface IStorageMealParams {
  name: string
  childs: IProductData[]
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
        name, childs: childs.map(params => food.createFood({
          name: params.name,
          proteins: +params.proteins,
          fats: +params.fats,
          carbohydrates: +params.carbohydrates,
          chunks: +params.chunks,
        }))
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

function getInstance() {
  return dietPlanInstance
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

function removeAll() {
  getMeals()
    .map(meal => meal.name)
    .forEach(removeMealByName)
}

function getNewMeal() {
  return dietPlanInstance.getNewMeal()
}

function addFoodByName(mealName: string, name: string) {
  const food = getItemByName(foodList.getInstance(), name)
  const meal = getItemByName(getInstance(), mealName)
  if (!food || !meal) return []
  meal.add(food)
  return getFoodListByMealName(mealName)
}

function removeFoodByName(mealName: string, name: string) {
  const meal = getItemByName(getInstance(), mealName)
  if (!meal) return []
  meal.remove(name)
  return getFoodListByMealName(mealName)
}

function getFoodListByMealName(name: string) {
  const meal = getItemByName(getInstance(), name)
  return meal?.getAllList() || [] 
}

function getMealInfoDataByName(name: string): IMealInfoData[] {
  return getFoodListByMealName(name)
    .map((f) => {
      const data = food.getAllData(f)
      return {
        name: data.name,
        chunks: data.chunks,
        kcal: data.kcal,
        proteins: data.proteins,
        fats: data.fats,
        carbohydrates: data.carbohydrates,
      }
    })
}

function getMealEditableDataByName(name: string): IMealEditableData[] {
  return getFoodListByMealName(name)
    .map(f => {
      const data = food.getAllData(f)
      return {
        name: data.name, 
        portions: +data.chunks,
        min: 0,
        max: 0,
      }
    })
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