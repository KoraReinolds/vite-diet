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
      :title="`Приемы пищи (${mealsCount}) > Новый`"
      @changeMin="changeMinValues"
      @changeMax="changeMaxValues"
      @delete="removeFoodFromMealSection"
      @cancel="clearNewMealSection"
      @save="saveNewMealSectionData"
    />
    <MealInfoSection
      v-else-if="mealName"
      :info-data="mealData"
      :title="`Приемы пищи (${mealsCount}) > ${mealName}`"
      @back="clearName"
    />
    <MealsSection
      v-else-if="mealsCount"
      :title="`Приемы пищи (${mealsCount})`"
      :list="mealNamesList"
      @clear="clearMealList"
      @select="setMealName"
    />

    <FoodSection
      v-if="foodData"
      :title="`Продукты (${productSectionData.length})`"
      v-model="foodData"
      @cancel="closeFoodSection"
      @save="saveFood"
    />
    <FoodListSection
      v-else
      :items="productSectionData"
      @delete="removeFoodFromProductSection"
      @select="editFoodDataByName"
      @add="addNewFood"
    />
    
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import { watch } from 'vue';
import PFCSection from './components/PFCSection.vue';
import NewMealSection from './components/NewMealSection.vue';
import FoodListSection from './components/FoodListSection.vue';
import FoodSection from './components/FoodSection.vue';
import {
  productSectionData,
  togleFoodSelection,
} from './layerUI/foodList';
import {
  foodData,
  addNewFood,
  clearFoodData,
  saveFood,
  editFoodDataByName,
} from './layerUI/foodItem';
import {
  curentEnergy,
  totalEnergy,
} from './layerUI/energyData';
import {
  pfcRatioArr,
  mealsPFC,
} from './layerUI/pfc';
import {
  saveNewMeal,
  mealNamesList,
  clearMealList,
  mealsCount,
} from './layerUI/mealsList';
import {
  setMealName,
  mealName,
  setNewMealName,
  clearName,
} from './layerUI/mealName';
import {
  addFood,
  removeFood,
  mealData,
} from './layerUI/mealData';
import {
  resultData,
  minValues,
  maxValues,
  changeMinValues,
  changeMaxValues,
  removeMinValue,
  removeMaxValue,
  calculate,
}  from './layerUI/result';
import MealsSection from './components/MealsSection.vue';
import MealInfoSection from './components/MealInfoSection.vue';

function closeFoodSection() {
  clearFoodData()
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
  addFood(name)
  calculate()
}

function clearNewMealSection() {
  resultData.value
    .forEach(item => {
      removeDataFromMealSection(item.name)
      removeFood(item.name)
    })
  clearName()
  calculate()
}

function saveNewMealSectionData() {
  saveNewMeal()
  resultData.value
    .forEach(item => {
      removeDataFromMealSection(item.name)
    })
  clearName()
}

calculate()

watch(pfcRatioArr, calculate)
watch(totalEnergy, calculate)
watch(minValues, calculate, { deep: true })
watch(maxValues, calculate, { deep: true })

</script>./layerUI/foodItem