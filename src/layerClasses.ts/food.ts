import { Food } from "@/classes/Food";
import type { IFoodParams } from "@/interfaces/IFoodParams";
import type { IMealEditableData, IMealInfoData, INewFoodData, IProductData } from "@/interfaces/ITable"

const poridge = new Food({ name: 'poridge', fats: 5, carbohydrates: 63, proteins: 14 })
const milk = new Food({ name: 'milk', fats: 3.2, carbohydrates: 4.7, proteins: 2.9 })
const nuts = new Food({ name: 'nuts', fats: 56, carbohydrates: 12.5, proteins: 22.5 })
const strawberry = new Food({ name: 'strawberry', fats: 0.4, carbohydrates: 5.7, proteins: 0.7 })
const cherry = new Food({ name: 'cherry', fats: 0.44, carbohydrates: 11.2, proteins: 0.9 })
const egg = new Food({ name: 'egg', chunkSize: 60, chunks: 2, fats: 11, carbohydrates: 1.1, proteins: 13 })
const rice = new Food({ name: 'rice', fats: 0.5, carbohydrates: 75, proteins: 6.5 })
const chicken = new Food({ name: 'chicken', fats: 0.5, carbohydrates: 0.5, proteins: 20 })

function isFoodParams(data: IFoodParams): data is IFoodParams {
  return typeof data === 'object'
    && data.name !== undefined
    && data.proteins !== undefined
    && data.fats !== undefined
    && data.carbohydrates !== undefined
    && data.chunks !== undefined
}

function getParamsFromFood(food: Food) {
  return {
    name: food.name,
    proteins: food.proteins,
    fats: food.fats,
    carbohydrates: food.carbohydrates,
    chunkSize: food.chunkSize, 
    chunks: food.chunks, 
  }
}

function getFoodData(food: Food): IMealInfoData {
  return {
    name: food.name,
    chunks: food.chunks.toFixed(0),
    kcal: food.getEnergy().toFixed(1),
    proteins: food.proteins.toFixed(1),
    fats: food.fats.toFixed(1),
    carbohydrates: food.carbohydrates.toFixed(1),
  }
}

function getProductData(food: Food): IProductData {
  return {
    name: food.name, 
    kcal: food.getEnergyPer100().toFixed(1),
    proteins: food.proteinsChunkPer100.toFixed(1),
    fats: food.fatsChunkPer100.toFixed(1),
    carbohydrates: food.carbohydratesChunkPer100.toFixed(1),
  }
}

function getMealEditalbeData(food: Food): IMealEditableData {
  return {
    name: food.name, 
    portions: food.chunks,
    min: 0,
    max: 0,
  }
}

function createFood(params: IFoodParams) {
  return new Food(params)
}

function getFoodDataToChange(food: Food): INewFoodData {
  return {
    name: food.name,
    proteins: food.proteins,
    fats: food.fats,
    carbohydrates: food.carbohydrates,
    chunkSize: food.chunkSize,
  }
}

export default {
  getParamsFromFood,
  isFoodParams,
  getFoodDataToChange,
  createFood,
  getMealEditalbeData,
  getFoodData,
  getProductData,
  poridge,
  milk,
  nuts,
  strawberry,
  cherry,
  egg,
  rice,
  chicken,
}