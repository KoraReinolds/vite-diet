import { computed } from "vue"
import { useLocalStorage } from "@vueuse/core"
import { CREATED_FOOD_LIST_KEY } from "@/layerUtils/constants"
import mealListData from "@/layerData/mealListData"
import { getProductDataByMealName } from "@/layerData/mealData"

const mealNamesList = computed(() =>
  mealListData.createdMealsData.value
    .map(meal => meal.name)
)

const storageMealsData = computed({
  get() {
    mealNamesList.value
    return mealNamesList.value
      .map(name => {
        return ({
          childs: getProductDataByMealName(name),
          name,
        })
      })
  },
  set() {}
}) 

useLocalStorage(CREATED_FOOD_LIST_KEY, storageMealsData)

const mealsCount = computed(() => mealNamesList.value.length)

export {
  mealsCount,
  mealNamesList,
}
