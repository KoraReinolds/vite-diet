<script setup lang="ts">
import { Food } from './classes/Food';
import { Fats, Proteins, Carbohydrates } from './classes/MacroNutrient';

const fats = new Fats(8)
const carbohydrates = new Carbohydrates(11)
const proteins = new Proteins(1)
const food = new Food({ name: 'egg', fats, carbohydrates, proteins })
console.log(food, food.getEnergy())

</script>