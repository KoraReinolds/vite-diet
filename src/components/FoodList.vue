<template>
  <table class="table-auto">
  <thead>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Chunks</th>
      <th>Chunk size</th>
      <th>Proteins</th>
      <th>Fats</th>
      <th>Carbohydrates</th>
      <th>Kcal</th>
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
      <td>{{ item.chunks }}</td>
      <td>{{ item.chunkSize }}</td>
      <td>{{ item.proteins }}</td>
      <td>{{ item.fats }}</td>
      <td>{{ item.carbohydrates }}</td>
      <td>{{ item.getEnergy() }}</td>
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