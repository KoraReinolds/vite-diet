<script setup lang="ts">
import { DietPlan } from './classes/DietPlan';
import { Dish } from './classes/Dish';
import { Food } from './classes/Food';

const poridge = new Food({ name: 'poridge', fats: 8, carbohydrates: 11, proteins: 1 })
const milk = new Food({ name: 'milk', fats: 8, carbohydrates: 11, proteins: 1 })
const nuts = new Food({ name: 'nuts', fats: 8, carbohydrates: 11, proteins: 1 })
const strawberry = new Food({ name: 'strawberry', fats: 8, carbohydrates: 11, proteins: 1 })
const cherry = new Food({ name: 'cherry', fats: 8, carbohydrates: 11, proteins: 1 })
const egg = new Food({ name: 'egg', fats: 8, carbohydrates: 11, proteins: 1 })
const poridgeOnMilk = new Dish({ name: 'poridgeOnMilk', food: [poridge, milk, strawberry, cherry, nuts]})
const dp = new DietPlan({ food: [egg, poridgeOnMilk] })
console.log(dp.getEnergy())

</script>