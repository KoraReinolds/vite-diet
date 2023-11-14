import { computed, ref } from "vue"
import { dietPlan } from "./dietPlanInstance"
import { resultData } from "./result"
import { PFCRatio, type PFC } from "@/interfaces/PFC"
import { useReactive } from "@/composables/useReactive"

const totalEnergy = useReactive(
  () => dietPlan.kcal,
  (value: number) => dietPlan.kcal = value
)

const pfcRatio = useReactive(
  () => dietPlan.pfcRatio,
  (value: PFC) => dietPlan.pfcRatio = value 
)

const pfcRatioArr = computed({
  get: () => Object.values(pfcRatio.value),
  set: ([proteins, fats, carbohydrates]) => pfcRatio.value = {
    proteins, fats, carbohydrates
  }
})

function getMeals() {
  return dietPlan.getAllList()
}
const allMeals = ref(getMeals())
const createdMeals = computed(() => {
  return allMeals.value.filter((meal) => meal.name !== 'newMeal')
})
const mealNamesList = computed(() => allMeals.value.map(meal => meal.name))

const curentEnergy = computed(() => {
  resultData.value
  allMeals.value // recalculates when clearMealsSection() call 
  return +dietPlan.getEnergy().toFixed(0) || 0
})

function saveNewMeal() {
  dietPlan.addMeal()
  allMeals.value = getMeals()
}

function clearMealsSection() {
  mealNamesList.value.forEach(name => dietPlan.remove(name))
  allMeals.value = getMeals()
} 

const mealsPFC = computed(() => {
  resultData.value
  const res: Record<string, number>[]  = [{}, {}, {}]

  allMeals.value.forEach(meal => {
    Object.values(new PFCRatio(meal).normilize())
      .forEach((val, i) => res[i][meal.name] = val / allMeals.value.length)
  })

  return res
})

export {
  createdMeals as meals,
  totalEnergy,
  pfcRatioArr,
  saveNewMeal,
  curentEnergy,
  mealsPFC,
  mealNamesList,
  clearMealsSection,
}
