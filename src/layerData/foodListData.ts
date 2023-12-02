import type { IFoodData } from "@/interfaces/IFoodData";
import type { INewFoodData } from "@/interfaces/IData";
import { ref } from "vue";
import selectedFoodData from "./selectedFoodData";
import { getAllFoodData } from "./foodData";
import { addNewProduct, getProductList, removeProductByName } from "@/layerClasses.ts/productList";
import utilsData from "@/layerUtils/utilsData";

const allFoodData = ref<IFoodData[]>(getListData())

function reloadFoodList() {
  return allFoodData.value = getListData()
}

function getListData() {
  return utilsData.listToData(
    getProductList(),
    getAllFoodData
  )
}

function addNewFood(params: INewFoodData) {
  addNewProduct(params)
  reloadFoodList()
  selectedFoodData.reloadSelectedData()
}

function removeFoodByName(name: string) {
  removeProductByName(name)
  reloadFoodList()
  selectedFoodData.reloadSelectedData()
}
  
function changeFoodData(params: INewFoodData, oldName: string) {  
  removeFoodByName(oldName)
  addNewFood(params)
}

export default {
  allFoodData,
  addNewFood,
  removeFoodByName,
  changeFoodData,
}