import { computed } from "vue"
import { useLocalStorage } from '@vueuse/core'
import { FOOD_LIST_KEY } from "@/layerUtils/constants"
import foodListData from "@/layerData/foodListData"
import selectedFoodData from "@/layerData/selectedFoodData"
import utilsData from "@/layerUtils/utilsData"

const allFoodProductData = computed(() =>
  foodListData.allFoodData.value
    .map(utilsData.getProductData)
)

const productSectionData = computed(() =>
  allFoodProductData.value
    .filter(
      data => selectedFoodData.selected.value[data.name] === false
    )
    .sort((a, b) => (a.name < b.name) ? -1 : 1)
)

const storageFoodData = computed({
  get() { return allFoodProductData.value },
  set() {}
}) 

useLocalStorage(FOOD_LIST_KEY, storageFoodData)

export {
  productSectionData,
}
