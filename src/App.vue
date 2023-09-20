<template>
  <div>
    <div
      class="bg-red-100"
      v-for="food in dp.getAllList()"
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
        kkal
      </div>
    </div>

    <div v-for="food in dp.getSelected()"
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
        {{ Math.floor(food.chunkSize) }}
      </div>
      <div class="w-20">
        {{ Math.floor(food.proteins) }}
      </div>
      <div class="w-20">
        {{ Math.floor(food.fats) }}
      </div>
      <div class="w-20">
        {{ Math.floor(food.carbohydrates) }}
      </div>
      <div class="w-20">
        {{ Math.floor(food.getEnergy()) }}
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { Food } from './classes/Food';
import { SelectableDietPlan } from './classes/SeletableDIetPlan';

const poridge = new Food({ name: 'poridge', fats: 5, carbohydrates: 63, proteins: 14 })
const milk = new Food({ name: 'milk', fats: 3.2, carbohydrates: 4.7, proteins: 2.9 })
const nuts = new Food({ name: 'nuts', fats: 56, carbohydrates: 12.5, proteins: 22.5 })
const strawberry = new Food({ name: 'strawberry', fats: 0.4, carbohydrates: 5.7, proteins: 0.7 })
const cherry = new Food({ name: 'cherry', fats: 0.44, carbohydrates: 11.2, proteins: 0.9 })
const egg = new Food({ name: 'egg', chunkSize: 60, chunks: 1, fats: 11, carbohydrates: 1.1, proteins: 13 })
const rice = new Food({ name: 'rice', fats: 0.5, carbohydrates: 75, proteins: 6.5 })
const chicken = new Food({ name: 'chicken', fats: 0.5, carbohydrates: 0.5, proteins: 20 })
const dp = new SelectableDietPlan({ childs: [poridge, chicken, milk, nuts, strawberry, cherry, egg, rice], pfcRatio: { proteins: 25, carbohydrates: 55, fats: 20 }, kkal: 2500 })
dp.selectAll()

const selected: Ref<Record<string, boolean>> = ref(dp.selected.reduce((obj: Record<string, boolean>, v) => {
  if (v) obj[v] = true
  return obj
}, {}))

watch(selected.value, (selectedObj) => {
  dp.setSelected(Object.entries(selectedObj)
    .filter(([key, val]) => !!val)
    .map(([key, val]) => key)
  )
})
</script>