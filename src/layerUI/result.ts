import { computed, ref } from "vue"
import { mealName } from "./mealName"
import { useKeyValueStorage } from "../composables/useKyeValuesStorage"
import { pfcRatioArr } from "./pfc"
import { totalEnergy } from "./energyData"
import dietPlan from "@/layerClasses.ts/dietPlan"
import { productSectionData } from "./foodList"

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
  productSectionData.value
  if (mealName.value !== 'newMeal') return []
  const data = dietPlan.getMealEditableDataByName(mealName.value)
  data.forEach(item => {
    const min = minValues.value[item.name] ?? 0
    const max = maxValues.value[item.name] ?? 10000
    item.min = min
    item.max = max
  })
  return data
})

const searchIsSuccessful = ref(false)

function calculate() {
  searchIsSuccessful.value = !!dietPlan.calculate(
    minValues.value,
    maxValues.value
  )
}

export {
  calculate,
  resultData,
  minValues,
  maxValues,
  changeMinValues,
  changeMaxValues,
  removeMinValue,
  removeMaxValue,
}
