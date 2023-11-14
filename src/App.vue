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
    <MealInfoSection
      v-else-if="mealName"
      :info-data="mealData"
      :title="`Приемы пищи (${meals.length}) > ${mealName}`"
      @back="clearName"
    />
    <MealsSection
      v-else-if="meals.length"
      :title="`Приемы пищи (${mealNamesList.length})`"
      :list="mealNamesList"
      @clear="clearMealsSection"
      @select="setMealName"
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
  mealNamesList,
  clearMealsSection,
} from './dataHandlers/dietPlan';
import {
  setMealName,
  mealName,
  setNewMealName,
  addFood,
  removeFood,
  clearName,
  mealFoodNamesList,
  mealData,
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
import MealsSection from './components/MealsSection.vue';
import MealInfoSection from './components/MealInfoSection.vue';

const searchIsSuccessful = ref(false)

function calculate() {
  const gs = new GreedySearch(
    new GraphNode(dietPlan, minValues.value, maxValues.value)
  )
  searchIsSuccessful.value = !!gs.search(0.01)
}

function removeDataFromMealSection(name: string) {
  togleFoodSelection(name)
  removeMaxValue(name)
  removeMinValue(name)
}

function removeFoodFromMealSection(name: string) {
  removeFood(name)
  removeDataFromMealSection(name)
  if (!resultData.value.length) clearName()
  calculate()
}

function removeFoodFromProductSection(name: string) {
  setNewMealName()
  togleFoodSelection(name)
  const food = getFoodByName(name)
  if (food) addFood.value(food)
  calculate()
}

function clearNewMealSection() {
  mealFoodNamesList.value
    .forEach(name => {
      removeDataFromMealSection(name)
      removeFood(name)
    })
  clearName()
  calculate()
}

function saveNewMealSectionData() {
  saveNewMeal()
  mealFoodNamesList.value
    .forEach(name => {
      removeDataFromMealSection(name)
    })
  clearName()
}

calculate()

watch(pfcRatioArr, calculate)
watch(totalEnergy, calculate)
watch(minValues, calculate, { deep: true })
watch(maxValues, calculate, { deep: true })

</script>