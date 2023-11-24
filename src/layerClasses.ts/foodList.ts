import { FoodList } from "@/classes/FoodList";
import type { INewFoodData, IProductData } from "@/interfaces/ITable";
import food from "@/layerClasses.ts/food"
import { FOOD_LIST_KEY } from "./constants";

function isListOfFoodParams(data: IProductData[]): data is IProductData[] {
  return Array.isArray(data)
    && data.every((item) => food.isFoodParams(item))
}

function parseFoodList(foodData: string) {
  try {
    const data = JSON.parse(foodData)

    if (isListOfFoodParams(data)) {
      return data.map(params => food.createFood({
        name: params.name,
        proteins: +params.proteins,
        fats: +params.fats,
        carbohydrates: +params.carbohydrates,
        chunks: +params.chunks,
      }))
    }

    throw new Error()
  } catch {
    console.warn("Can't parse food list data")
  }
}

const foodListInstance = new FoodList(
  parseFoodList(localStorage.getItem(FOOD_LIST_KEY) || '')
  || [
    food.poridge,
    food.chicken,
    food.milk,
    food.nuts,
    food.strawberry,
    food.cherry,
    food.egg,
    food.rice,
    food.carrot,
    food.sunflowerOil,
    food.onion,
    food.greanBeans,
    food.cauliflower,
    food.broccoli,
    food.pepper,
  ]
)

function getFoodByName(name: string) {
  return foodListInstance.get(name) 
}

function togleSelection(name: string) {
  foodListInstance.togleSelect(name)
}

function getProductData() {
  return foodListInstance
    .getSelected()
    .map(food.getProductData)
    .sort((a, b) => (a.name < b.name) ? -1 : 1)
}

function addNewFood(params: INewFoodData) {
  const newFood = food.createFood(params)
  foodListInstance.add(newFood)
}

function removeFoodByName(name: string) {
  foodListInstance.remove(name)
}
  
function changeFoodData(params: INewFoodData, oldName: string) {  
  removeFoodByName(oldName)
  addNewFood(params)
}

function getFoodDataToChangeByName(name: string) {
  const f = getFoodByName(name)
  if (!f) return
  return food.getFoodDataToChange(f)
}

function getAllItems() {
  return foodListInstance.getAllList()
}

export default {
  isListOfFoodParams,
  parseFoodList,
  getAllItems,
  getFoodDataToChangeByName,
  addNewFood,
  changeFoodData,
  getFoodByName,
  togleSelection,
  getProductData,
  removeFoodByName,
}