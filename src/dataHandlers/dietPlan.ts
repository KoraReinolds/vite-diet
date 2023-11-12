import { computed, ref, watch } from "vue"
import { dietPlan } from "./dietPlanInstance"
import { resultData } from "./result"
import { PFCRatio } from "@/interfaces/PFC"
import { mealName, newMeal } from "./meal"

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


const meals = ref(getMeals())
function getMeals() {
  return dietPlan.getAllList().filter((meal) => meal.name !== 'newMeal')
}
const mealNamesList = computed(() => meals.value.map(meal => meal.name))

const curentEnergy = computed(() => {
  resultData.value
  meals.value // recalculates when clearMealsSection() call 
  return +dietPlan.getEnergy().toFixed(0) || 0
})

function saveNewMeal() {
  dietPlan.addMeal()
  meals.value = getMeals()
}

function clearMealsSection() {
  mealNamesList.value.forEach(name => dietPlan.remove(name))
  meals.value = getMeals() 
}

const mealsPFC = computed(() => {
  resultData.value
  const res: Record<string, number>[]  = [{}, {}, {}]

  const all = [...meals.value]
  if (mealName.value === 'newMeal') all.push(newMeal.value)
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
  mealNamesList,
  clearMealsSection,
}
