<template>
  <div v-for="val, key in res">
    {{ key }}
    {{ val }}
  </div>
</template>

<script setup lang="ts">
import { DietPlan } from './classes/DietPlan';
import { Dish } from './classes/Dish';
import { Food } from './classes/Food';

const poridge = new Food({ name: 'poridge', fats: 5, carbohydrates: 63, proteins: 14 })
const milk = new Food({ name: 'milk', fats: 3.2, carbohydrates: 4.7, proteins: 2.9 })
const nuts = new Food({ name: 'nuts', fats: 56, carbohydrates: 12.5, proteins: 22.5 })
const strawberry = new Food({ name: 'strawberry', fats: 0.4, carbohydrates: 5.7, proteins: 0.7 })
const cherry = new Food({ name: 'cherry', fats: 0.44, carbohydrates: 11.2, proteins: 0.9 })
const egg = new Food({ name: 'egg', fats: 11, carbohydrates: 1.1, proteins: 13 })
const rice = new Food({ name: 'rice', fats: 0.5, carbohydrates: 75, proteins: 6.5 })
const poridgeOnMilk = new Dish({ name: 'poridgeOnMilk', food: [poridge, milk, strawberry, cherry, nuts]})
const dp = new DietPlan({ food: [rice, egg, poridgeOnMilk, poridge, milk, strawberry, cherry, nuts], pfcRatio: { proteins: 25, carbohydrates: 55, fats: 20 }, kkal: 2500 })

console.log(dp)
dp.selectAll()

const res = dp.calculate()

</script>