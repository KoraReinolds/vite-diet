import type { INewFoodData } from "@/interfaces/IData"
import { ref } from "vue"
import foodListData from "@/layerData/foodListData"
import utilsData from "@/layerUtils/utilsData"

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

function deleteFood() {
  foodListData.removeFoodByName(oldName.value)
  clearFoodData()
}

function saveFood() {
  if (!foodData.value) return 

  if (isNewFood.value) {
    foodListData.addNewFood(foodData.value)
  } else {
    foodListData.changeFoodData(foodData.value, oldName.value)
  }
  clearFoodData()
}

function editFoodDataByName(name: string) {
  foodData.value = utilsData.getNewFoodDataFromFoodData(
    utilsData.getItemByName(
      foodListData.allFoodData.value,
      name
    )
  )
  oldName.value = name
}

export {
  editFoodDataByName,
  saveFood,
  deleteFood,
  clearFoodData,
  foodData,
  addNewFood,
}
