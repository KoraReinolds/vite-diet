import { computed, ref } from "vue"
import { useKeyValueStorage } from "../composables/useKyeValuesStorage"
import { pfcRatioArr } from "./pfc"
import { calculate } from "@/layerClasses.ts/calculate"
import { productSectionData } from "./foodList"
import { totalEnergy } from "@/layerData/energyData"
import { getEditableData } from "@/layerData/mealData"

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

  return getEditableData().map(
    item => {
      const min = minValues.value[item.name] ?? 0
      const max = maxValues.value[item.name] ?? 10000
      item.min = min
      item.max = max
      return item
    }
  )
})

const searchIsSuccessful = ref(false)

function calculateResult() {
  searchIsSuccessful.value = !!calculate(
    minValues.value,
    maxValues.value
  )
}

export {
  calculateResult as calculate,
  resultData,
  minValues,
  maxValues,
  changeMinValues,
  changeMaxValues,
  removeMinValue,
  removeMaxValue,
}
