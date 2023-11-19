import foodList from "@/layerClasses.ts/foodList"
import { computed, ref } from "vue"
import { useLocalStorage } from '@vueuse/core'
import { FOOD_LIST_KEY } from "@/layerClasses.ts/constants"
import food from "@/layerClasses.ts/food"

const productSectionData = ref(foodList.getProductData())

const storageFoodData = computed({
  get() {
    productSectionData.value
    return foodList.getAllItems().map(food.getParamsFromFood)
  },
  set() {}
}) 

useLocalStorage(FOOD_LIST_KEY, storageFoodData)

function reloadProductSectionData() {
  productSectionData.value = foodList.getProductData()
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
