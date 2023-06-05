<script setup lang="ts">
import { Food } from './classes/Food';
import { Fats, Proteins, Carbohydrates } from './classes/MacroNutrient';

const f = new Fats(8)
const c = new Carbohydrates(11)
const p = new Proteins(1)
const food = new Food('egg', [p,f,c])
console.log(food, food.getEnergy())

</script>