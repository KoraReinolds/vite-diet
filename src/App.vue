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
import { ref, watch, type Ref, computed } from 'vue';
import { GraphNode } from './classes/GraphNode';
import { GreedySearch } from './classes/GreedySearch';
import { PFCRatio, type PFC } from './interfaces/PFC';
import PFCSection from './components/PFCSection.vue';
import NewMealSection from './components/NewMealSection.vue';
import FoodSection from './components/FoodSection.vue';
import { useFoodList } from './composables/useFoodList';
import { useDietPlan } from './composables/useDietPlan';
import type { Meal } from './classes/Meal';

const result: Ref<Meal | undefined> = ref()
const resultEnergy = ref(0)

const {
  productSectionData,
  togleFoodSelection,
  newMealSectionData,
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
} = useDietPlan()

const removeFoodFromMealSection = (name: string) => {
  togleFoodSelection(name)
  removeFood(name)
}

const clearNewMealSection = () => {
  newMealSectionData.value
    .map(food => food.name)
    .forEach(name => removeFoodFromMealSection(name))
}

const removeFoodFromProductSection = (name: string) => {
  togleFoodSelection(name)
  const food = getFoodByName(name)
  if (food) addFood(food)
}

const pfcRatioArr = computed({
  get: () => Object.values(pfcRatio.value),
  set: ([proteins, fats, carbohydrates]) => pfcRatio.value = {
    proteins, fats, carbohydrates
  }
})
const mealsPFC = computed(() => {
  const p: Record<string, number> = {}
  const f: Record<string, number> = {}
  const c: Record<string, number> = {}

  const all = [...meals.value]
  if (result.value) all.push(result.value)
  all.forEach(meal => {
    const { proteins, fats, carbohydrates } = new PFCRatio({
      carbohydrates: meal.carbohydrates,
      proteins: meal.proteins,
      fats: meal.fats,
    }).normilize()
    p[meal.name] = proteins / all.length
    f[meal.name] = fats / all.length
    c[meal.name] = carbohydrates / all.length
  })
  return [p, f ,c]
})

const calculate = () => {
  const gs = new GreedySearch(new GraphNode(dietPlan))
  const meal = gs.search(0.01)?.meal
  result.value = meal
  resultEnergy.value = meal ? meal.getEnergy() : 0
}

calculate()

watch(newMealSectionData, (data) => {
  if (!data.length) clearName()
  else setNewMealName()
  calculate()
})

</script>