<script setup lang="ts">
import { DietPlan } from './classes/DietPlan';
import { Food } from './classes/Food';

const food = new Food({ name: 'egg', fats: 8, carbohydrates: 11, proteins: 1 })
const dp = new DietPlan({ fats: 8, carbohydrates: 11, proteins: 1 })
const mn = food.get('fats')
const mn2 = dp.get('fats')
mn2?.set(1)
console.log(dp.getEnergy(), mn2)

</script>