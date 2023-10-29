<template>
  <Header></Header>
  <div class="flex-column space-y-2">

    <PFCSection />

    <MealSection />

    <FoodSection :fl="fl" @change="calculate" />

  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import { ref, type Ref } from 'vue';
import { Food } from './classes/Food';
import { FoodList } from './classes/FoodList';
import { GraphNode } from './classes/GraphNode';
import { GreedySearch } from './classes/GreedySearch';
import { DietPlan } from './classes/DietPlan';
import { Meal } from './classes/Meal';
import { PFCRatio } from './interfaces/PFC';
import PFCSection from './components/PFCSection.vue';
import MealSection from './components/MealSection.vue';
import FoodSection from './components/FoodSection.vue';
import useDP from './store/useDP';
import { storeToRefs } from 'pinia';

const poridge = new Food({ name: 'poridge', fats: 5, carbohydrates: 63, proteins: 14 })
const milk = new Food({ name: 'milk', fats: 3.2, carbohydrates: 4.7, proteins: 2.9 })
const nuts = new Food({ name: 'nuts', fats: 56, carbohydrates: 12.5, proteins: 22.5 })
const strawberry = new Food({ name: 'strawberry', fats: 0.4, carbohydrates: 5.7, proteins: 0.7 })
const cherry = new Food({ name: 'cherry', fats: 0.44, carbohydrates: 11.2, proteins: 0.9 })
const egg = new Food({ name: 'egg', chunkSize: 60, chunks: 2, fats: 11, carbohydrates: 1.1, proteins: 13 })
const rice = new Food({ name: 'rice', fats: 0.5, carbohydrates: 75, proteins: 6.5 })
const chicken = new Food({ name: 'chicken', fats: 0.5, carbohydrates: 0.5, proteins: 20 })
const fl = new FoodList([poridge, chicken, milk, nuts, strawberry, cherry, egg, rice])

const { newMeal } = storeToRefs(useDP())
const { setDietPlan, setNewMealName } = useDP()
const dp = new DietPlan({
  childs: [],
  pfcRatio: { proteins: 25, carbohydrates: 55, fats: 20 },
  kcal: 2500
})
setDietPlan(dp)
const result: Ref<Meal | undefined> = ref()
const pfc: Ref<PFCRatio> = ref(new PFCRatio({ carbohydrates: 0, fats: 0, proteins: 0 }))

const calculate = () => {
  if (!dp.value) return
  fl.getSelected().forEach(food => newMeal.value.add(food))
  if (newMeal.value.getAllList().length) {
    console.log(newMeal.value.getAllList().length, dp.value, newMeal)
    setNewMealName()
    const gs = new GreedySearch(new GraphNode(dp))
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

</script>./store/useDP