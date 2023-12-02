import { computed, ref } from "vue"
import type { MN } from "@/interfaces/IMacroNutrientValues"
import { totalEnergy } from "./energyData"
import mealListData from "./mealListData"
import { PFCEnergyRatio } from "@/interfaces/PFC"
import { getEditableDataFromFood, getProductDataFromFood } from "@/layerData/foodData"
import { getProductByName } from "@/layerClasses.ts/productList"
import { addFoodByMealName, getFoodListByMealName, isNewMealName, removeFoodByMealName } from "@/layerClasses.ts/meal"
import type { IMealData } from "@/interfaces/IData"
import { NEW_MEAL_NAME } from "@/layerUtils/constants"
import utilsData from "@/layerUtils/utilsData"

const mealName = ref('')

const isNewMeal = computed(() => isNewMealName(mealName.value))

function setMealName(name: string) {
  mealName.value = name
}

function setNewMealName() {
  if (isNewMeal.value) return
  setMealName(NEW_MEAL_NAME)
  mealListData.reloadMealData()
}

function clearName() { setMealName('') }

const mealInfoData = computed(() => getProductDataByMealName(
  mealName.value
)) 

function getProductDataByMealName(mealName: string) {
  return utilsData.listToData(
    getFoodListByMealName(mealName),
    getProductDataFromFood
  )
}

function groupMealListDataByName(mealListData: IMealData[], macronutrient: MN) {
  return Object.fromEntries(
    mealListData.map(mealData => {
      const value = (new PFCEnergyRatio(mealData).normilize())[macronutrient]
      return [mealData.name, value * mealData.energy / totalEnergy.value]
    }) 
  )
}

function getEditableData() {
  return isNewMeal.value
    ? utilsData.listToData(
      getFoodListByMealName(mealName.value),
      getEditableDataFromFood
    ) : [] 
}

function addFoodByName(name: string) {
  const food = getProductByName(name)
  if (addFoodByMealName(food, mealName.value)) {
    mealListData.reloadMealData()
  }
}

function removeFoodByName(name: string) {
  if (removeFoodByMealName(mealName.value, name)) {
    mealListData.reloadMealData()
  }
}


export {
  mealName,
  setMealName,
  mealInfoData,
  getEditableData,
  addFoodByName,
  removeFoodByName,
  groupMealListDataByName,
  isNewMeal,
  getProductDataByMealName,
  setNewMealName,
  clearName,
}
