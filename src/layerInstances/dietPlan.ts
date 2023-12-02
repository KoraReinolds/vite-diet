import { Meal } from "@/classes/Meal"
import type { IProductData } from "@/interfaces/IData"
import { CREATED_FOOD_LIST_KEY } from "@/layerUtils/constants"
import utilsData from "@/layerUtils/utilsData"
import food from "./food"
import { DietPlan } from "@/classes/DietPlan"
import type { IDietPlan } from "@/interfaces/IDietPlan"

interface IStorageMealParams {
  name: string
  childs: IProductData[]
}

function isListOfStorageMealParams(data: IStorageMealParams[]): data is IStorageMealParams[] {
  return Array.isArray(data)
    && data.every(mealParams => {
      return mealParams.name !== undefined
      && mealParams.childs !== undefined
      && utilsData.isListOfProductData(mealParams.childs)
    }) 
}

function parseMealList(foodData: string) {
  try {
    const data = JSON.parse(foodData)

    if (isListOfStorageMealParams(data)) {
      return data.map(({ name, childs }) => new Meal({
        name, childs: childs.map(d => food.createFood(
          utilsData.getFoodParamsFromProductData(d)
        )
      )}))
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

export default dietPlanInstance
