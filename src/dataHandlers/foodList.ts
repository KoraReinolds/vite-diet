import { Food } from "@/classes/Food"
import { FoodList } from "@/classes/FoodList"
import type { IProductData } from "@/interfaces/ITable"
import { computed, ref } from "vue"

const poridge = new Food({ name: 'poridge', fats: 5, carbohydrates: 63, proteins: 14 })
const milk = new Food({ name: 'milk', fats: 3.2, carbohydrates: 4.7, proteins: 2.9 })
const nuts = new Food({ name: 'nuts', fats: 56, carbohydrates: 12.5, proteins: 22.5 })
const strawberry = new Food({ name: 'strawberry', fats: 0.4, carbohydrates: 5.7, proteins: 0.7 })
const cherry = new Food({ name: 'cherry', fats: 0.44, carbohydrates: 11.2, proteins: 0.9 })
const egg = new Food({ name: 'egg', chunkSize: 60, chunks: 2, fats: 11, carbohydrates: 1.1, proteins: 13 })
const rice = new Food({ name: 'rice', fats: 0.5, carbohydrates: 75, proteins: 6.5 })
const chicken = new Food({ name: 'chicken', fats: 0.5, carbohydrates: 0.5, proteins: 20 })
const foodList = new FoodList([poridge, chicken, milk, nuts, strawberry, cherry, egg, rice])

const selectedData = ref<Record<string, boolean>>(foodList.selected)

const selectedFoodEntries = computed(
  () => Object.entries(selectedData.value)
)

const reduceNamesFood = (res: Food[], name: string) => {
  const food = foodList.get(name)
  if (food) res.push(food)
  return res
}

const foodListNamesSelected = computed(
  () => selectedFoodEntries.value.reduce<string[]>(
    (res: string[], pair: [string, boolean]) => {
      if (pair[1]) res.push(pair[0])
      return res
    }, []
  )
)

const foodListSelected = computed(
  () => foodListNamesSelected.value
    .reduce<Food[]>(reduceNamesFood, [])
)

const foodListNamesNotSelected = computed(
  () => selectedFoodEntries.value.reduce<string[]>(
    (res: string[], pair: [string, boolean]) => {
      if (!pair[1]) res.push(pair[0])
      return res
    }, []
  )
)

const foodListNotSelected = computed(
  () => foodListNamesNotSelected.value
    .reduce<Food[]>(reduceNamesFood, [])
)

const productSectionData = computed(
  (): IProductData[] => foodListNotSelected.value.map(
    food => ({
      name: food.name, 
      kcal: food.getEnergyPer100().toFixed(1),
      proteins: food.proteinsChunkPer100.toFixed(1),
      fats: food.fatsChunkPer100.toFixed(1),
      carbohydrates: food.carbohydratesChunkPer100.toFixed(1),
    })
  )
)

const selectAll = () => {
  foodList.selectAll()
  selectedData.value = foodList.selected
}

const addNewFood = () => {

}

const togleFoodSelection = (name: string) => {
  if (name in selectedData.value) {
    selectedData.value[name] = !selectedData.value[name]
  }
}
  
const getFoodByName = (name: string) => {
  return foodList.get(name) 
} 

export {
  selectedFoodEntries,
  foodList,
  selectedData,
  selectAll,
  addNewFood,
  togleFoodSelection,
  foodListSelected,
  productSectionData,
  getFoodByName,
}
