import type { INewFoodData } from "@/interfaces/IData";
import models from "@/layerInstances/models";
import { addItem, getAllItems, removeItemByName } from "@/layerUtils/composite";
import utilsData from "@/layerUtils/utilsData";

function getSelected() {
  return models.foodList.selected
}

function selectByName(name: string) {
  models.foodList.togleSelect(name)
}

function getProductList() {
  return getAllItems(models.foodList)
}

function getProductByName(foodName: string) {
  return utilsData.getItemByName(getProductList(), foodName)
}

function removeProductByName(name: string) {
  removeItemByName(models.foodList, name)
}

function addNewProduct(params: INewFoodData) {
  addItem(
    models.foodList,
    models.foods.createFood(params)
  )
}

export {
  getSelected,
  getProductList,
  getProductByName,
  addNewProduct,
  removeProductByName,
  selectByName,
}