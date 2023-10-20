<template>
  <Header></Header>
  <div class="flex-column space-y-2">

    <AppSection
      title="Соотношение БЖУ"
    >
      <template v-slot:headerSide>
        <div>
          <span>Всего ккал ({{ curentEnergy }} / </span>
          <ResizedInput v-model="totalEnergy" />
          <span>)</span>
        </div>
      </template>
      <template v-slot:body>
        <PFCBar
          v-model="pfcRatio"
          :filled="actualPFC"
        />
        <div class="font-bold">
          <span>Белки - {{ (pfcRatio.proteins * 100).toFixed() }}%; </span>
          <span>Жиры - {{ (pfcRatio.fats * 100).toFixed() }}%; </span>
          <span>Углеводы - {{ (pfcRatio.carbohydrates * 100).toFixed() }}%; </span>
        </div>
      </template>
    </AppSection>
    <AppSection
      :title="`Приемы пищи (${mealCount})`"
    >
      <template v-slot:body>
        <div class="flex items-center space-x-2 h-6">
          <div
            class="flex items-center justify-center w-full text-xs text-center bg-text h-full text-white font-bold cursor-pointer hover:bg-main"
            v-for="meal in meals"
            :key="meal.name"
          >
            <span>{{ meal.name }}</span>
          </div>
        </div>
        <div>
          Для расчета нового приема пищи добавьте продукты из списка ниже  
        </div>
      </template>
    </AppSection>
   
  </div>
  <FoodListComponent
    :food-list="fl"
    @update-selected="calculate"
  />
  <div>
    <div class="flex">
      <div class="w-20">
        name
      </div>
      <div class="w-20">
        chunks
      </div>
      <div class="w-20">
        chunkSize
      </div>
      <div class="w-20">
        prots
      </div>
      <div class="w-20">
        fats
      </div>
      <div class="w-20">
        carbs
      </div>
      <div class="w-20">
        kcal
      </div>
    </div>

    <template v-if="dp || result">
      <div v-for="food in result?.getAllList()"
        :key="`res-${food.name}`"
        class="flex"
      >
        <div class="w-20">
          {{ food.name }}
        </div>
        <div class="w-20">
          {{ Math.floor(food.chunks * 100) / 100 }}
        </div>
        <div class="w-20">
          {{ Math.floor(food.chunkSize * 100) / 100 }}
        </div>
        <div class="w-20">
          {{ Math.floor(food.proteins * 100) / 100 }}
        </div>
        <div class="w-20">
          {{ Math.floor(food.fats * 100) / 100 }}
        </div>
        <div class="w-20">
          {{ Math.floor(food.carbohydrates * 100) / 100 }}
        </div>
        <div class="w-20">
          {{ Math.floor(food.getEnergy() * 100) / 100 }}
        </div>
      </div>
      {{ Math.floor(dp.getEnergy()) }} {{ pfc.normilize() }}
    </template>
  </div>
</template>

<script setup lang="ts">
import FoodListComponent from './components/FoodList.vue'
import Header from './components/Header.vue'
import AppSection from './components/AppSection.vue'
import { ref, type Ref } from 'vue';
import { Food } from './classes/Food';
import { FoodList } from './classes/FoodList';
import { GraphNode } from './classes/GraphNode';
import { GreedySearch } from './classes/GreedySearch';
import { DietPlan } from './classes/DietPlan';
import { Meal } from './classes/Meal';
import { PFCRatio } from './interfaces/PFC';
import { useDP } from './composition/useDP';
import ResizedInput from './components/ResizedInput.vue';
import PFCBar from './components/PFCBar.vue';

const poridge = new Food({ name: 'poridge', fats: 5, carbohydrates: 63, proteins: 14 })
const milk = new Food({ name: 'milk', fats: 3.2, carbohydrates: 4.7, proteins: 2.9 })
const nuts = new Food({ name: 'nuts', fats: 56, carbohydrates: 12.5, proteins: 22.5 })
const strawberry = new Food({ name: 'strawberry', fats: 0.4, carbohydrates: 5.7, proteins: 0.7 })
const cherry = new Food({ name: 'cherry', fats: 0.44, carbohydrates: 11.2, proteins: 0.9 })
const egg = new Food({ name: 'egg', chunkSize: 60, chunks: 2, fats: 11, carbohydrates: 1.1, proteins: 13 })
const rice = new Food({ name: 'rice', fats: 0.5, carbohydrates: 75, proteins: 6.5 })
const chicken = new Food({ name: 'chicken', fats: 0.5, carbohydrates: 0.5, proteins: 20 })
const fl = new FoodList([poridge, chicken, milk, nuts, strawberry, cherry, egg, rice])
fl.selectAll()

const dp: Ref<DietPlan | undefined> = ref()
const result: Ref<Meal | undefined> = ref()
const pfc: Ref<PFCRatio> = ref(new PFCRatio({ carbohydrates: 0, fats: 0, proteins: 0}))
dp.value = new DietPlan({
  childs: fl.getSelected(),
  pfcRatio: { proteins: 25, carbohydrates: 55, fats: 20 },
  kcal: 2500
})
const { totalEnergy, curentEnergy, pfcRatio, actualPFC, mealCount, meals } = useDP(dp.value)

const calculate = () => {
  if (!dp.value) return
  const newMeal = dp.value.getNewMeal()
  fl.getSelected().forEach(food => newMeal.add(food))
  console.log(dp.value)
  if (newMeal) {
    const gs = new GreedySearch(new GraphNode(dp.value))
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