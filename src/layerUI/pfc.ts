import { computed } from "vue"
import { pfcRatio } from "@/layerData/pfcData"
import mealListData from "@/layerData/mealListData"
import { resultData } from "./result"
import { groupMealListDataByName } from "@/layerData/mealData"

const pfcRatioArr = computed({
  get: () => Object.values(pfcRatio.value),
  set: ([proteins, fats, carbohydrates]) => pfcRatio.value = {
    proteins, fats, carbohydrates
  }
})

const filledData = computed(() => {
  resultData.value
  mealListData.createdMealsData.value

  const mealsData = mealListData.getMealData()
  return [
    groupMealListDataByName(mealsData, 'proteins'),
    groupMealListDataByName(mealsData, 'fats'),
    groupMealListDataByName(mealsData, 'carbohydrates'),
  ]}
)

export {
  pfcRatioArr,
  filledData,
}
