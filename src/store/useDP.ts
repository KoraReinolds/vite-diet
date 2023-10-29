import { PFCRatio, type PFC } from "@/interfaces/PFC"
import { computed, ref, watch } from "vue"
import { defineStore } from "pinia"
import { DietPlan } from "@/classes/DietPlan"
import type { IDietPlan } from "@/interfaces/IDietPlan"

export default defineStore("dietPlan", () => {

  let dp: IDietPlan = new DietPlan({
    childs: [],
    pfcRatio: { proteins: 25, carbohydrates: 55, fats: 20 },
    kcal: 2500
  })
  const setDietPlan = (dietPlan: DietPlan) => {
    dp = dietPlan
  }

  const mealName = ref('')
  const setMealName = (name: string) => mealName.value = name
  const setNewMealName = () => setMealName('newMeal')

  const curentEnergy = computed(() => +dp.getEnergy().toFixed(0) || 0)
  const totalEnergy = ref(`${dp.kcal}`)
  watch(totalEnergy, (value: string) => {
    dp.kcal = +value
  })

  const pfcRatio = ref(dp.pfcRatio)
  const normilizePFC = (pfc: PFC) => {
    return new PFCRatio(pfc).normilize()
  }
  const actualPFC = computed(() => {
    const ratio = curentEnergy.value / +totalEnergy.value
    const pfc = normilizePFC({
      proteins: dp.proteins,
      fats: dp.fats,
      carbohydrates: dp.carbohydrates,
    })
    pfc.proteins *= ratio
    pfc.carbohydrates *= ratio
    pfc.fats *= ratio
    return pfc
  })

  const meals = computed(() => dp.getAllList().filter(food => food.name !== 'newMeal'))
  const mealCount = computed(() => meals.value.length)
  const meal = computed(() => dp.get(mealName.value))
  const newMeal = computed(() => dp.getNewMeal())
  const newMealFoodList = computed(() => newMeal.value.getAllList())
 
  watch(pfcRatio, (value: PFC) => {
    dp.pfcRatio = normilizePFC(value)
  })
  
  return { curentEnergy, totalEnergy, pfcRatio, actualPFC, mealCount, meals, mealName, setDietPlan, setMealName, meal, newMeal, setNewMealName, newMealFoodList } 

})
