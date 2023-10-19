<template>
  <table class="table-auto">
  <thead>
    <tr>
      <th class="w-10 text-sm text-left"></th>
      <th class="w-24 text-sm text-left">Name</th>
      <th class="w-10 text-sm text-left">Size</th>
      <th class="w-20 text-sm text-left">Proteins</th>
      <th class="w-20 text-sm text-left">Fats</th>
      <th class="w-20 text-sm text-left">Carbs</th>
      <th class="w-20 text-sm text-left">Kcal</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in props.foodList.getAllList()" :key="item.name">
      <td>
        <input
          type="checkbox"
          :value="item.name"
          v-model="selected[item.name]"
        >
      </td>
      <td>{{ item.name }}</td>
      <td>{{ item.chunkSize }}</td>
      <td>{{ item.proteinsChunkPer100.toFixed(1) }}</td>
      <td>{{ item.fatsChunkPer100.toFixed(1) }}</td>
      <td>{{ item.carbohydratesChunkPer100.toFixed(1) }}</td>
      <td>{{ item.getEnergyPer100().toFixed(1) }}</td>
    </tr>
  </tbody>
</table>
</template>

<script setup lang="ts">
import type { FoodList } from '@/classes/FoodList';
import { ref, type PropType, type Ref, watch } from 'vue';

const props = defineProps({
  foodList: {
    type: Object as PropType<FoodList>,
    required: true,
  }
})

const emit = defineEmits(['updateSelected'])

const selected: Ref<Record<string, boolean>> = ref(props.foodList.selected)

watch(selected.value, () => emit('updateSelected'))

</script>