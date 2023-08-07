<template>
  <div>
    <div
      class="bg-red-100"
      v-for="[key, food] in dp.getAll()"
      :key="`dp-${key}`"
    >
      <input
        type="checkbox"
        v-model="selected[key]"
      >
      {{ key }}
    </div> 
  </div>
  <div>

    <div class="flex">
      <div class="w-20">
        name
      </div>
      <div class="w-20">
        value
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

    <div v-for="[key, food] in result.getAll()"
      :key="`res-${key}`"
      class="flex"
    >
      <div class="w-20">
        {{ key }}
      </div>
      <div class="w-20">
        {{ Math.floor(food.value) }}
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

    <div class="flex">
      <div class="w-20">
        Total
      </div>
      <div class="w-20">
        
      </div>
      <div class="w-20">
        <div>{{ result.proteinsBoundaries[0] }}</div>
        <div>{{ Math.floor(result.proteins) }}</div>
        <div>{{ result.proteinsBoundaries[1] }}</div>
      </div>
      <div class="w-20">
        <div>{{ result.fatsBoundaries[0] }}</div>
        <div>{{ Math.floor(result.fats) }}</div>
        <div>{{ result.fatsBoundaries[1] }}</div>
      </div>
      <div class="w-20">
        <div>{{ result.carbohydratesBoundaries[0] }}</div>
        <div>{{ Math.floor(result.carbohydrates) }}</div>
        <div>{{ result.carbohydratesBoundaries[1] }}</div>
      </div>
      <div class="w-20">
        {{ result.getEnergy() }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';
import { DietPlan } from './classes/DietPlan';
import { Food } from './classes/Food';
import { Result } from 'postcss';
import { LPSolverResult } from './classes/LPSolverResult';

const poridge = new Food({ name: 'poridge', fats: 5, carbohydrates: 63, proteins: 14 })
const milk = new Food({ name: 'milk', fats: 3.2, carbohydrates: 4.7, proteins: 2.9 })
const nuts = new Food({ name: 'nuts', fats: 56, carbohydrates: 12.5, proteins: 22.5 })
const strawberry = new Food({ name: 'strawberry', fats: 0.4, carbohydrates: 5.7, proteins: 0.7 })
const cherry = new Food({ name: 'cherry', fats: 0.44, carbohydrates: 11.2, proteins: 0.9 })
const egg = new Food({ name: 'egg', fats: 11, carbohydrates: 1.1, proteins: 13 })
const rice = new Food({ name: 'rice', fats: 0.5, carbohydrates: 75, proteins: 6.5 })
const chicken = new Food({ name: 'chicken', fats: 0.5, carbohydrates: 0.5, proteins: 20 })
const dp = new DietPlan({ food: [chicken, rice, egg, poridge, milk, strawberry, cherry, nuts], pfcRatio: { proteins: 25, carbohydrates: 55, fats: 20 }, kkal: 2500 })
// dp.selectAll()
const result = new LPSolverResult(dp)
result.calculate()
// const res = ref(dp.calculate())
const selected: Ref<Record<string, boolean>> = ref(dp.selected.reduce((obj: Record<string, boolean>, v) => {
  if (v) obj[v] = true
  return obj
}, {}))
watch(selected.value, (selectedObj) => {
  dp.setSelected(Object.entries(selectedObj)
    .filter(([key, val]) => !!val)
    .map(([key, val]) => key)
  )
  result.calculate()
})

</script>