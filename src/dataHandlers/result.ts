import { computed } from "vue"
import {
  mealName,
  mealFoodList,
} from "./meal"
import { useKeyValueStorage } from "../composables/useKyeValuesStorage"
import { pfcRatioArr, totalEnergy } from "./dietPlan"

const resultFoodList = computed(() => mealName.value === 'newMeal' ? mealFoodList.value : [])

const {
  storage: minValues,
  addToStorage: changeMinValues,
  removeFromStorage: removeMinValue,
} = useKeyValueStorage()

const {
  storage: maxValues,
  addToStorage: changeMaxValues,
  removeFromStorage: removeMaxValue,
} = useKeyValueStorage()

const resultData = computed(() => {
  totalEnergy.value
  pfcRatioArr.value
  return resultFoodList.value
    .map(food => {
      const min = minValues.value[food.name] || 0
      const max = maxValues.value[food.name] || 10000
      return {
        name: food.name, 
        portions: food.chunks,
        min,
        max,
      }
    })
})

export {
  resultData,
  minValues,
  maxValues,
  changeMinValues,
  changeMaxValues,
  removeMinValue,
  removeMaxValue,
}
