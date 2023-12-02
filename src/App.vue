<template>

  <Header>
    <IconProduct
      class="w-8 h-8"
      :class="selectedSection === 'food' ? 'text-white' : 'text-main cursor-pointer'"
      @click="selectedSection = 'food'"
    />
    <IconBadge :value="resultData.length">      
      <IconDish
        class="w-8 h-8"
        :class="selectedSection === 'meal' ? 'text-white' : 'text-main cursor-pointer'"
        @click="selectedSection = 'meal'"
      />
    </IconBadge>
  </Header>
  
  <main class="
    flex gap-2 flex-wrap
  ">

    <SectionPFC
      class="w-full"
      :displayNames="['Белки', 'Жиры', 'Углеводы']"
      :colors="['bg-proteins', 'bg-fats', 'bg-carbohydrates']"
      :filledRatio="filledData"
      v-model:percentRatio="pfcRatioArr"
      v-model:maxValue="totalEnergy"
      :curentValue="curentEnergy"
      :selectedName="mealName"
    />

    <SectionMealNew
      v-if="isNewMeal"
      :class="mealSectionClass"
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
      :class="mealSectionClass"
      :info-data="mealInfoData"
      :title="`Приемы пищи (${mealsCount}) > ${mealName}`"
      @back="clearName"
    />
    <SectionMeals
      v-else-if="mealsCount"
      :class="mealSectionClass"
      :title="`Приемы пищи (${mealsCount})`"
      :list="mealNamesList"
      @clear="mealListData.clearMealList"
      @select="setMealName"
    />

    <SectionFood
      v-if="foodData"
      :class="productSectionClass"
      :title="`Продукты (${productSectionData.length})`"
      v-model="foodData"
      @cancel="closeSectionFood"
      @save="saveFood"
      @delete="deleteFood"
    />
    <SectionFoodList
      v-else
      :class="productSectionClass"
      :items="productSectionData"
      @delete="removeFoodFromProductSection"
      @select="editFoodDataByName"
      @add="addNewFood"
    />

  </main>
    
</template>

<script setup lang="ts">
import IconProduct from './components/IconProduct.vue';
import IconDish from './components/IconDish.vue';
import Header from './components/Header.vue'
import { computed, ref, watch } from 'vue';
import SectionPFC from './components/SectionPFC.vue';
import SectionMealNew from './components/SectionMealNew.vue';
import SectionFoodList from './components/SectionFoodList.vue';
import SectionFood from './components/SectionFood.vue';
import {
  productSectionData,
} from './layerUI/foodList';
import {
  foodData,
  addNewFood,
  clearFoodData,
  saveFood,
  deleteFood,
  editFoodDataByName,
} from './layerUI/foodItem';
import {
  curentEnergy,
  totalEnergy,
} from './layerData/energyData';
import {
  pfcRatioArr,
  filledData,
} from './layerUI/pfc';
import {
  mealNamesList,
  mealsCount,
} from './layerUI/mealsList';
import {
  setMealName,
  mealName,
  setNewMealName,
  clearName,
  isNewMeal,
} from './layerData/mealData';
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
import IconBadge from './components/IconBadge.vue';
import selectedFoodData from './layerData/selectedFoodData';
import mealListData from './layerData/mealListData';
import { addFoodByName, removeFoodByName, mealInfoData } from './layerData/mealData';

const selectedSection = ref<'meal' | 'food'>("food")
const mealSectionClass = computed(() => [
  selectedSection.value === "food" ? "hidden" : "",
  "sm:flex"
])
const productSectionClass = computed(() => [
  selectedSection.value === "meal" ? "hidden" : "",
  "sm:flex"
])

function closeSectionFood() {
  clearFoodData()
}

function removeDataFromMealSection(name: string) {
  selectedFoodData.togleSelection(name)
  removeMaxValue(name)
  removeMinValue(name)
}

function removeFoodFromMealSection(name: string) {
  removeFoodByName(name)
  removeDataFromMealSection(name)
  if (!resultData.value.length) clearName()
  calculate()
}

function removeFoodFromProductSection(name: string) {
  setNewMealName()
  selectedFoodData.togleSelection(name)
  addFoodByName(name)
  calculate()
}

function clearSectionMealNew() {
  resultData.value
    .forEach(item => {
      removeDataFromMealSection(item.name)
      removeFoodByName(item.name)
    })
  clearName()
  calculate()
}

function saveSectionMealNewData() {
  mealListData.saveNewMeal()
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