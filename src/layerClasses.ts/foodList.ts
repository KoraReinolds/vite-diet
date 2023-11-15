import { FoodList } from "@/classes/FoodList";
import food from "@/layerClasses.ts/food"

const foodList = new FoodList([
  food.poridge,
  food.chicken,
  food.milk,
  food.nuts,
  food.strawberry,
  food.cherry,
  food.egg,
  food.rice,
])

function getFoodByName(name: string) {
  return foodList.get(name) 
}

function togleSelection(name: string) {
  foodList.togleSelect(name)
}

function getProductData() {
  return foodList
    .getSelected()
    .map(food.getProductData)
}

export default {
  getFoodByName,
  togleSelection,
  getProductData,
}