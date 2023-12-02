import models from "@/layerInstances/models";
import { getAllItems, removeAllItems } from "@/layerUtils/composite";

function getMealList() {
  return getAllItems(models.dietPlan)
}

function removeMeals() {
  removeAllItems(models.dietPlan)
}

function saveNewMeal() {
  models.dietPlan.addMeal()
}

export default {
  getMealList,
  saveNewMeal,
  removeMeals,
}