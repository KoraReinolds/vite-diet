import foodList from "@/layerClasses.ts/foodList"
import { computed, ref } from "vue"
import { useLocalStorage } from '@vueuse/core'
import { FOOD_LIST_KEY } from "@/layerClasses.ts/constants"

const productSectionData = ref(foodList.getProductData(foodList.getSelected()))

const storageFoodData = computed({
  get() {
    productSectionData.value
    return foodList.getProductData(foodList.getAllItems())
  },
  set() {}
}) 

useLocalStorage(FOOD_LIST_KEY, storageFoodData)

function reloadProductSectionData() {
  productSectionData.value = foodList.getProductData(foodList.getSelected())
}

function togleFoodSelection(name: string) {
  foodList.togleSelection(name)
  reloadProductSectionData()
}
  
export {
  reloadProductSectionData,
  togleFoodSelection,
  productSectionData,
}
