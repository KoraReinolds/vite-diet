import type { INewFoodData } from "@/interfaces/ITable"
import foodList from "@/layerClasses.ts/foodList"
import { ref } from "vue"
import { reloadProductSectionData } from "./foodList"

const foodData = ref<INewFoodData>()
const isNewFood = ref(false)
const oldName = ref('')

function addNewFood() {
  isNewFood.value = true
  foodData.value = {
    name: '',
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    chunkSize: 1,
  }
}

function clearFoodData() {
  foodData.value = undefined
  isNewFood.value = false
  oldName.value = ''
}

function saveFood() {
  if (!foodData.value) return 

  if (isNewFood.value) {
    foodList.addNewFood(foodData.value)
    reloadProductSectionData()
  } else {
    foodList.changeFoodData(foodData.value, oldName.value)
  }
  clearFoodData()
  reloadProductSectionData()
  oldName.value = ''
}

function editFoodDataByName(name: string) {
  foodData.value = foodList.getFoodDataToChangeByName(name)
  oldName.value = name
}

export {
  editFoodDataByName,
  saveFood,
  clearFoodData,
  foodData,
  addNewFood,
}
