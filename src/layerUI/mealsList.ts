import { computed, ref } from "vue"
import dietPlan from "@/layerClasses.ts/dietPlan"
import { useLocalStorage } from "@vueuse/core"
import { CREATED_FOOD_LIST_KEY } from "@/layerClasses.ts/constants"
import foodList from "@/layerClasses.ts/foodList"

const mealNamesList = ref(dietPlan.createdMeals())

const storageMealsData = computed({
  get() {
    mealNamesList.value
    return dietPlan.getMeals()
      .map(meal => ({
        childs: foodList.getProductData(dietPlan.getFoodListByMealName(meal.name)),
        name: meal.name,
      }))
  },
  set() {}
}) 

useLocalStorage(CREATED_FOOD_LIST_KEY, storageMealsData)
const mealsCount = computed(() => mealNamesList.value.length)

function saveNewMeal() {
  dietPlan.saveNewMeal()
  mealNamesList.value = dietPlan.createdMeals()
}

function clearMealList() {
  dietPlan.removeAll()
  mealNamesList.value = dietPlan.createdMeals()
} 

export {
  mealsCount,
  saveNewMeal,
  mealNamesList,
  clearMealList,
}
