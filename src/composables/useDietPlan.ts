import { ref, watch } from "vue"
import { DietPlan } from "@/classes/DietPlan"
import type { IDietPlan } from "@/interfaces/IDietPlan"
import type { Food } from "@/classes/Food"

const useDietPlan = () => {

  const dietPlan: IDietPlan = new DietPlan({
    childs: [],
    pfcRatio: { proteins: 25, carbohydrates: 55, fats: 20 },
    kcal: 2500
  })

  const mealName = ref('')
  const setMealName = (name: string) => mealName.value = name
  const setNewMealName = () => setMealName('newMeal')
  const clearName = () => setMealName('')

  const getCurentEnergy = () => +dietPlan.getEnergy().toFixed(0) || 0
  const curentEnergy = ref(getCurentEnergy())
  const totalEnergy = ref(dietPlan.kcal)
  watch(totalEnergy, (value: number) => {
    dietPlan.kcal = +value
  })

  const pfcRatio = ref(dietPlan.pfcRatio)
  watch(pfcRatio, (value) => {
    dietPlan.pfcRatio = value
  })
  
  const addFood = (food: Food) => {
    dietPlan.getNewMeal().add(food)
  }
  
  const removeFood = (name: string) => {
    dietPlan.getNewMeal().remove(name)
  }

  const meals = ref(dietPlan.getAllList().filter(food => food.name !== 'newMeal'))
  
  return {
    mealName,
    setMealName,
    setNewMealName,
    clearName,
    meals,
    pfcRatio,
    totalEnergy,
    curentEnergy,
    dietPlan,
    addFood,
    removeFood,
  }

}

export { useDietPlan }