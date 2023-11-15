import foodList from "@/layerClasses.ts/foodList"
import { ref } from "vue"

const productSectionData = ref(foodList.getProductData())

function addNewFood() {

}

function togleFoodSelection(name: string) {
  foodList.togleSelection(name)
  productSectionData.value = foodList.getProductData()
}
  
export {
  addNewFood,
  togleFoodSelection,
  productSectionData,
}
