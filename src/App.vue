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
import type { IMealRow } from './interfaces/ITable';

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
} = useDietPlan()

const getNewMealSectionData = () => newMeal.value
  .getAllList()
  .map(food => ({
    name: food.name, 
    portions: food.chunks,
    min: 0,
    max: 1000,
  }))   

const newMealSectionData = ref<IMealRow[]>(getNewMealSectionData())

watch(newMealSectionData, (data) => {
  if (!data.length) clearName()
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
  if (searchIsSuccessful.value) all.push(newMeal.value)
  all.forEach(meal => {
    Object.entries(new PFCRatio(meal).normilize())
      .map(pair => pair[1] / all.length)
      .forEach((val, i) => res[i][meal.name] = val)
  })

  return res
}
const mealsPFC = ref<Record<string, number>[]>(getMealPFC())

const calculate = () => {
  const gs = new GreedySearch(new GraphNode(dietPlan))
  searchIsSuccessful.value = !!gs.search(0.01)
  resultEnergy.value = searchIsSuccessful.value
   ? newMeal.value.getEnergy() : 0
  newMealSectionData.value = getNewMealSectionData()
  mealsPFC.value = getMealPFC()
}

const removeFoodFromMealSection = (name: string) => {
  togleFoodSelection(name)
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

</script>