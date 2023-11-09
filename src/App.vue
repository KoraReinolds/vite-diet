<template>
  <Header></Header>
  <div class="foodlistex-column space-y-2">

    <PFCSection
      :displayNames="['Белки', 'Жиры', 'Углеводы']"
      :colors="['bg-proteins', 'bg-fats', 'bg-carbohydrates']"
      :filledRatio="mealsPFC"
      v-model:percentRatio="pfcRatioArr"
      v-model:maxValue="totalEnergy"
      :curentValue="curentEnergy + resultEnergy"
      :selectedName="mealName"
    />

    <NewMealSection
      v-if="mealName === 'newMeal'"
      :items="newMealSectionData"
      :title="`Приемы пищи (${meals.length}) > Новый`"
      @changeMin="changeMinValues"
      @changeMax="changeMaxValues"
      @delete="removeFoodFromMealSection"
      @cancel="clearNewMealSection"
    />

    <FoodSection
      :items="productSectionData"
      @delete="removeFoodFromProductSection"
      @select="console.log($event)"
      @add="console.log($event)"
    />
    
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import { ref, watch, computed } from 'vue';
import { GraphNode } from './classes/GraphNode';
import { GreedySearch } from './classes/GreedySearch';
import { PFCRatio } from './interfaces/PFC';
import PFCSection from './components/PFCSection.vue';
import NewMealSection from './components/NewMealSection.vue';
import FoodSection from './components/FoodSection.vue';
import { useFoodList } from './composables/useFoodList';
import { useDietPlan } from './composables/useDietPlan';
import { useKeyValueStorage } from './composables/useKyeValuesStorage';

const resultEnergy = ref(0)
const searchIsSuccessful = ref(false)

const {
  productSectionData,
  togleFoodSelection,
  getFoodByName,
} = useFoodList()

const {
  mealName,
  meals,
  pfcRatio,
  totalEnergy,
  curentEnergy,
  dietPlan,
  setNewMealName,
  clearName,
  addFood,
  removeFood,
  newMeal,
  newMealFoodList,
} = useDietPlan()

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

const newMealSectionData = computed(() => {
  totalEnergy.value
  pfcRatioArr.value
  return newMealFoodList.value
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
  }
)

watch(newMealFoodList, (list) => {
  if (!list.length) clearName()
  else setNewMealName()
})

const pfcRatioArr = computed({
  get: () => Object.values(pfcRatio.value),
  set: ([proteins, fats, carbohydrates]) => pfcRatio.value = {
    proteins, fats, carbohydrates
  }
})

const getMealPFC = () => {
  const res: Record<string, number>[]  = [{}, {}, {}]

  const all = [...meals.value]
  all.push(newMeal.value)
  all.forEach(meal => {
    Object.entries(new PFCRatio(meal).normilize())
      .map(pair => pair[1] / all.length)
      .forEach((val, i) => res[i][meal.name] = val)
  })

  return res
}
const mealsPFC = ref<Record<string, number>[]>(getMealPFC())

const calculate = () => {
  const gs = new GreedySearch(
    new GraphNode(dietPlan, minValues.value, maxValues.value)
  )
  searchIsSuccessful.value = !!gs.search(0.01)
  resultEnergy.value = newMeal.value.getEnergy()
  mealsPFC.value = getMealPFC()
}

const removeFoodFromMealSection = (name: string) => {
  togleFoodSelection(name)
  removeMaxValue(name)
  removeMinValue(name)
  removeFood(name)
  calculate()
}

const removeFoodFromProductSection = (name: string) => {
  togleFoodSelection(name)
  const food = getFoodByName(name)
  if (food) addFood(food)
  calculate()
}

const clearNewMealSection = () => {
  newMealSectionData.value
    .map(food => food.name)
    .forEach(name => removeFoodFromMealSection(name))
}

calculate()

watch(pfcRatioArr, calculate)
watch(totalEnergy, calculate)
watch(minValues, calculate, { deep: true })
watch(maxValues, calculate, { deep: true })

</script>