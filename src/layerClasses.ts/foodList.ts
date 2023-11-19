import { FoodList } from "@/classes/FoodList";
import type { INewFoodData } from "@/interfaces/ITable";
import food from "@/layerClasses.ts/food"
import { FOOD_LIST_KEY } from "./constants";
import type { IFoodParams } from "@/interfaces/IFoodParams";

function isListOfFoodParams(data: IFoodParams[]): data is IFoodParams[] {
  return Array.isArray(data)
    && data.every((item) => food.isFoodParams(item))
}

function parseFoodList(foodData: string) {
  try {
    const data = JSON.parse(foodData)

    if (isListOfFoodParams(data)) {
      return data.map(food.createFood)
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
}

function addNewFood(params: INewFoodData) {
  const newFood = food.createFood(params)
  foodListInstance.add(newFood)
}

function changeFoodData(params: INewFoodData) {  
  foodListInstance.remove(params.name)
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
}