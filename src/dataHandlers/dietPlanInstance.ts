import { DietPlan } from "@/classes/DietPlan"
import type { IDietPlan } from "@/interfaces/IDietPlan"

const dietPlan: IDietPlan = new DietPlan({
  childs: [],
  pfcRatio: { proteins: 25, carbohydrates: 55, fats: 20 },
  kcal: 2500
})

export { dietPlan }