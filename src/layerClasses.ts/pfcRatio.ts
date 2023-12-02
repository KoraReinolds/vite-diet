import type { PFC } from "@/interfaces/PFC"
import models from "@/layerInstances/models"

function getPFCRatio() {
  return models.dietPlan.pfcRatio
}

function setPFCRatio(value: PFC) {
  models.dietPlan.pfcRatio = value
}

export {
  getPFCRatio,
  setPFCRatio,
}