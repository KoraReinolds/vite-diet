<template>
  <div class="flex relative">
    <input
      class="absolute w-full bottom-0"
      min="0"
      max="1"
      v-model="first"
      step="0.01"
      type="range"
    >
    <input
      class="absolute w-full bottom-0"
      min="0"
      max="1"
      v-model="second"
      step="0.01"
      type="range"
    >
    <div class="h-2 flex w-full">
      <div
        v-for="key in PFCKeys"
        :key="key"
        class="h-2 flex first:bg-proteins bg-fats last:bg-carbohydrates"
        :style="{ flexGrow: modelValue[key] }"
      >
        <span
          class="h-full"
          :style="{ flexGrow: filled[key] / modelValue[key] }"
        ></span>
        <span
          v-if="filled[key] < modelValue[key]"
          class="bg-text h-full grow"
          :style="{ flexGrow: 1 - filled[key] / modelValue[key] }"
        ></span> 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PFC } from '@/interfaces/PFC';
import { ref, type PropType, watch } from 'vue';

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object as PropType<PFC>,
    required: true,
  },
  filled: {
    type: Object as PropType<PFC>,
    required: true,
  },
})

const PFCKeys: ['proteins', 'fats', 'carbohydrates'] = ['proteins', 'fats', 'carbohydrates']
const first = ref(props.modelValue.proteins)
const second = ref(1 - props.modelValue.carbohydrates)

const changePFC = () => {
  const min = Math.min(first.value, second.value)
  const max = Math.max(first.value, second.value)
  
  emit('update:modelValue', {
    proteins: min,
    fats: max - min,
    carbohydrates: 1 - max,
  })
}

watch(first, changePFC)

watch(second, changePFC)

</script>