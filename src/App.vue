<template>
  <Header></Header>
  <div class="
    flex flex-col
    gap-2 lg:gap-3
  ">

    <SectionPFC
      :displayNames="['Белки', 'Жиры', 'Углеводы']"
      :colors="['bg-proteins', 'bg-fats', 'bg-carbohydrates']"
      :filledRatio="filledData"
      v-model:percentRatio="pfcRatioArr"
      v-model:maxValue="totalEnergy"
      :curentValue="curentEnergy"
      :selectedName="mealName"
    />

    <div class="
      gap-2 lg:gap-3
      lg:flex 
    ">
      <SectionMealNew
        v-if="mealName === 'newMeal'"
        :items="resultData"
        :title="`Приемы пищи (${mealsCount}) > Новый`"
        @changeMin="changeMinValues"
        @changeMax="changeMaxValues"
        @delete="removeFoodFromMealSection"
        @cancel="clearSectionMealNew"
        @save="saveSectionMealNewData"
      />
      <SectionMealInfo
        v-else-if="mealName"
        :info-data="mealData"
        :title="`Приемы пищи (${mealsCount}) > ${mealName}`"
        @back="clearName"
      />
      <SectionMeals
        v-else-if="mealsCount"
        :title="`Приемы пищи (${mealsCount})`"
        :list="mealNamesList"
        @clear="clearMealList"
        @select="setMealName"
      />

      <SectionFood
        v-if="foodData"
        :title="`Продукты (${productSectionData.length})`"
        v-model="foodData"
        @cancel="closeSectionFood"
        @save="saveFood"
      />
      <SectionFoodList
        v-else
        :items="productSectionData"
        @delete="removeFoodFromProductSection"
        @select="editFoodDataByName"
        @add="addNewFood"
      />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import { watch } from 'vue';
import SectionPFC from './components/SectionPFC.vue';
import SectionMealNew from './components/SectionMealNew.vue';
import SectionFoodList from './components/SectionFoodList.vue';
import SectionFood from './components/SectionFood.vue';
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
  filledData,
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
import SectionMeals from './components/SectionMeals.vue';
import SectionMealInfo from './components/SectionMealInfo.vue';

function closeSectionFood() {
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

function clearSectionMealNew() {
  resultData.value
    .forEach(item => {
      removeDataFromMealSection(item.name)
      removeFood(item.name)
    })
  clearName()
  calculate()
}

function saveSectionMealNewData() {
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

</script>