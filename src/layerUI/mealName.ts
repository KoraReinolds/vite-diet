import { ref } from "vue"
import dietPlan from "@/layerClasses.ts/dietPlan"

const mealName = ref('')
function setMealName(name: string) {
  mealName.value = name
}
function setNewMealName() {
  if (mealName.value === 'newMeal') return
  dietPlan.getNewMeal()
  setMealName('newMeal')
}
function clearName() { setMealName('') }

export {
  mealName,
  setMealName,
  setNewMealName,
  clearName,
}
