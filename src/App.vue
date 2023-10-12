<template>
  <div>
    {{ fl.selected }}
    <div
      class="bg-red-100"
      v-for="food in fl.getAllList()"
      :key="`dp-${food.name}`"
    >
      <input
        type="checkbox"
        v-model="selected[food.name]"
      >
      {{ food.name }}
    </div> 
  </div>
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
      <div v-for="food in result?.dp.getAllList() || dp.getAllList()"
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
      {{ Math.floor(dp.getEnergy()) }} {{ dp.normilizePFC() }}
    </template>


  </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { Food } from './classes/Food';
import { FoodList } from './classes/FoodList';
import { GraphNode } from './classes/GraphNode';
import { GreedySearch } from './classes/GreedySearch';
import { DietPlan } from './classes/DietPlan';
import type { IGraphNode } from './interfaces/IGraphNode';

const poridge = new Food({ name: 'poridge', fats: 5, carbohydrates: 63, proteins: 14 })
const milk = new Food({ name: 'milk', fats: 3.2, carbohydrates: 4.7, proteins: 2.9 })
const nuts = new Food({ name: 'nuts', fats: 56, carbohydrates: 12.5, proteins: 22.5 })
const strawberry = new Food({ name: 'strawberry', fats: 0.4, carbohydrates: 5.7, proteins: 0.7 })
const cherry = new Food({ name: 'cherry', fats: 0.44, carbohydrates: 11.2, proteins: 0.9 })
const egg = new Food({ name: 'egg', chunkSize: 60, chunks: 1, fats: 11, carbohydrates: 1.1, proteins: 13 })
const rice = new Food({ name: 'rice', fats: 0.5, carbohydrates: 75, proteins: 6.5 })
const chicken = new Food({ name: 'chicken', fats: 0.5, carbohydrates: 0.5, proteins: 20 })
const fl = new FoodList([poridge, chicken, milk, nuts, strawberry, cherry, egg, rice])
fl.selectAll()
const selected: Ref<Record<string, boolean>> = ref(fl.selected.reduce((obj: Record<string, boolean>, v) => {
  if (v) obj[v] = true
  return obj
}, {}))
const dp: Ref<DietPlan | undefined> = ref()
const result: Ref<IGraphNode | undefined> = ref()
const calculate = (selectedObj: Record<string, boolean>) => {
  fl.selected = Object.entries(selectedObj)
  .filter(([key, val]) => !!val)
  .map(([key, val]) => key)
  dp.value = new DietPlan({
    childs: fl.getSelected(),
    pfcRatio: { proteins: 25, carbohydrates: 55, fats: 20 },
    kcal: 2500
  })
  const gs = new GreedySearch(new GraphNode(dp.value))
  result.value = gs.search(0.01)
}

calculate(selected.value)
watch(selected.value, calculate)


</script>