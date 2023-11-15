import foodList from "@/layerClasses.ts/foodList"
import { ref } from "vue"

const productSectionData = ref(foodList.getProductData())

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
