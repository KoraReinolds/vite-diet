<script setup lang="ts">
import { Food } from './classes/Food';

const food = new Food({ name: 'egg', fats: 8, carbohydrates: 11, proteins: 1 })
const mn = food.get('fats')
console.log(food, food.getEnergy(), mn)

</script>