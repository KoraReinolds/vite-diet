import { computed, ref, watch } from "vue"
import { dietPlan } from "./dietPlanInstance"
import { resultData } from "./result"
import { PFCRatio } from "@/interfaces/PFC"
import { newMeal } from "./meal"

const totalEnergy = ref(dietPlan.kcal)
watch(totalEnergy, (value: number) => {
  dietPlan.kcal = +value
})

const pfcRatio = ref(dietPlan.pfcRatio)
const pfcRatioArr = computed({
  get: () => Object.values(pfcRatio.value),
  set: ([proteins, fats, carbohydrates]) => pfcRatio.value = {
    proteins, fats, carbohydrates
  }
})
watch(pfcRatio, (value) => {
  dietPlan.pfcRatio = value
})


const meals = ref(dietPlan.getAllList())

function saveNewMeal() {
  dietPlan.addMeal()
  meals.value = dietPlan.getAllList()
}

const curentEnergy = computed(() => {
  resultData.value
  return +dietPlan.getEnergy().toFixed(0) || 0
})

const mealsPFC = computed(() => {
  resultData.value
  const res: Record<string, number>[]  = [{}, {}, {}]

  const all = [...meals.value, newMeal.value]
  all.forEach(meal => {
    Object.entries(new PFCRatio(meal).normilize())
      .map(pair => pair[1] / all.length)
      .forEach((val, i) => res[i][meal.name] = val)
  })

  return res
})

export {
  meals,
  totalEnergy,
  pfcRatioArr,
  saveNewMeal,
  curentEnergy,
  mealsPFC,
}
