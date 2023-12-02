import { FoodList } from "@/classes/FoodList"
import { FOOD_LIST_KEY } from "@/layerUtils/constants"
import utilsData from "@/layerUtils/utilsData"
import type { Food } from "@/classes/Food"
import food from "./food"

function parseFoodList(rawData: string): Food[] | undefined {
  try {
    const data = JSON.parse(rawData)

    if (utilsData.isListOfProductData(data)) {
      return data.map(d => food.createFood(
          utilsData.getFoodParamsFromProductData(d)
        )
      )
    }

    throw new Error()
  } catch {
    console.warn("Can't parse food list data")
  }
}

const foodListInstance: FoodList = new FoodList(
  parseFoodList(localStorage.getItem(FOOD_LIST_KEY) || '')
  || [...food.all]
)

export {
  foodListInstance,
}
