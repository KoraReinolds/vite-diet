import type { Food } from "@/classes/Food"
import type { IFoodData } from "@/interfaces/IFoodData"
import utilsData from "@/layerUtils/utilsData"

function getAllFoodData(food: Food): IFoodData {
  return {
    name: food.name,
    chunks: food.chunks.toFixed(0),
    kcal: food.getEnergy().toFixed(1),
    proteins: food.proteins.toFixed(1),
    fats: food.fats.toFixed(1),
    carbohydrates: food.carbohydrates.toFixed(1),
    kcal100: food.getEnergyPer100().toFixed(1),
    proteins100: food.proteinsChunkPer100.toFixed(1),
    fats100: food.fatsChunkPer100.toFixed(1),
    carbohydrates100: food.carbohydratesChunkPer100.toFixed(1),
    chunkSize: food.chunkSize.toFixed(0),
  }
}

function getProductDataFromFood(food: Food) {
  return utilsData.getProductData(
    getAllFoodData(food)
  )
}

function getEditableDataFromFood(food: Food) {
  return utilsData.getEditableData(
    getAllFoodData(food)
  )
}

export {
  getAllFoodData,
  getProductDataFromFood,
  getEditableDataFromFood,
}