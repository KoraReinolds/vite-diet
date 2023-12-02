import models from "@/layerInstances/models"

function getTotalEnergy() {
  return models.dietPlan.kcal
}

function setTotalEnergy(value: number) {
  models.dietPlan.kcal = value
}

function getCurentEnergy() {
  return models.dietPlan.getEnergy()
}

export {
  setTotalEnergy,
  getTotalEnergy,
  getCurentEnergy,
}
