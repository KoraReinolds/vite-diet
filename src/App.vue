<template>
  <Header></Header>
  <div class="foodlistex-column space-y-2">

    <PFCSection
      :displayNames="['Белки', 'Жиры', 'Углеводы']"
      :colors="['bg-proteins', 'bg-fats', 'bg-carbohydrates']"
      :filledRatio="mealsPFC"
      v-model:percentRatio="pfcRatioArr"
      v-model:maxValue="totalEnergy"
      :curentValue="curentEnergy"
      :selectedName="mealName"
    />

    <NewMealSection
      v-if="mealName === 'newMeal'"
      :items="resultData"
      :title="`Приемы пищи (${meals.length}) > Новый`"
      @changeMin="changeMinValues"
      @changeMax="changeMaxValues"
      @delete="removeFoodFromMealSection"
      @cancel="clearNewMealSection"
      @save="saveNewMealSectionData"
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
import { ref, watch } from 'vue';
import { GraphNode } from './classes/GraphNode';
import { GreedySearch } from './classes/GreedySearch';
import PFCSection from './components/PFCSection.vue';
import NewMealSection from './components/NewMealSection.vue';
import FoodSection from './components/FoodSection.vue';
import {
  productSectionData,
  togleFoodSelection,
  getFoodByName,
} from './dataHandlers/foodList';
import {
  meals,
  pfcRatioArr,
  totalEnergy,
  saveNewMeal,
  curentEnergy,
  mealsPFC,
} from './dataHandlers/dietPlan';
import {
  mealName,
  setNewMealName,
  addFood,
  removeFood,
  clearName,
} from './dataHandlers/meal';
import { dietPlan } from './dataHandlers/dietPlanInstance';
import {
  resultData,
  minValues,
  maxValues,
  changeMinValues,
  changeMaxValues,
  removeMinValue,
  removeMaxValue,
}  from './dataHandlers/result';

const searchIsSuccessful = ref(false)

const calculate = () => {
  const gs = new GreedySearch(
    new GraphNode(dietPlan, minValues.value, maxValues.value)
  )
  searchIsSuccessful.value = !!gs.search(0.01)
}

const removeFoodFromMealSection = (name: string) => {
  togleFoodSelection(name)
  removeMaxValue(name)
  removeMinValue(name)
  removeFood(name)
  calculate()
}

const removeFoodFromProductSection = (name: string) => {
  setNewMealName()
  togleFoodSelection(name)
  const food = getFoodByName(name)
  if (food) addFood(food)
  calculate()
}

const clearNewMealSection = () => {
  resultData.value
    .map(food => food.name)
    .forEach(name => removeFoodFromMealSection(name))
}

const saveNewMealSectionData = () => {
  saveNewMeal()
  clearNewMealSection()
}

calculate()

watch(resultData, (data) => {
  if (!data.length) clearName()
})
watch(pfcRatioArr, calculate)
watch(totalEnergy, calculate)
watch(minValues, calculate, { deep: true })
watch(maxValues, calculate, { deep: true })

</script>