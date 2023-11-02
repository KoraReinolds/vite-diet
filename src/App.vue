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

    <MealSection />

    <FoodSection :fl="foodList" @change="calculate" />
    
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import { ref, watch, type Ref, computed } from 'vue';
import { GraphNode } from './classes/GraphNode';
import { GreedySearch } from './classes/GreedySearch';
import { DietPlan } from './classes/DietPlan';
import { Meal } from './classes/Meal';
import { PFCRatio } from './interfaces/PFC';
import PFCSection from './components/PFCSection.vue';
import MealSection from './components/MealSection.vue';
import FoodSection from './components/FoodSection.vue';
import { useFoodList } from './composables/useFoodList';

const { foodList } = useFoodList()
foodList.selectAll()
const dietPlan = new DietPlan({
  childs: foodList.getSelected(),
  pfcRatio: { proteins: 25, carbohydrates: 55, fats: 20 },
  kcal: 2500
})

const mealName = ref('newMeal')
const pfcRatioArr = ref(Object.values(dietPlan.pfcRatio))
const getMealPFCRanges = () => {
  const p: Record<string, number> = {}
  const f: Record<string, number> = {}
  const c: Record<string, number> = {}

  const all = dietPlan.getAllList()
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
}
const mealsPFC = ref(getMealPFCRanges())

watch(pfcRatioArr, (val) => {
  dietPlan.pfcRatio = {
    proteins: val[0],
    fats: val[1],
    carbohydrates: val[2],
  }
})

const curentEnergy = ref(dietPlan.getEnergy())

const totalEnergy = ref(dietPlan.kcal)
watch(totalEnergy, (val) => dietPlan.kcal = val )

const result: Ref<Meal | undefined> = ref()
const pfc: Ref<PFCRatio> = ref(new PFCRatio({ carbohydrates: 0, fats: 0, proteins: 0 }))
const newMeal = dietPlan.getNewMeal()

const calculate = () => {
  if (!dietPlan) return
  foodList.getSelected().forEach(food => newMeal.add(food))
  if (newMeal.getAllList().length) {
    console.log(newMeal.getAllList().length, dietPlan, newMeal)
    const gs = new GreedySearch(new GraphNode(dietPlan))
    const meal = gs.search(0.01)?.meal
    result.value = meal
    if (!meal) return
    pfc.value.pfc = {
      carbohydrates: meal.carbohydrates,
      fats: meal.fats,
      proteins: meal.proteins
    }
  }
}

calculate()

</script>