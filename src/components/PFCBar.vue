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
      <div class="h-2 bg-text" :style="{ flexGrow: modelValue.proteins }">
        <span></span>
        <span></span>      
      </div>
      <div class="h-2 bg-text" :style="{ flexGrow: modelValue.fats }">
        <span></span>
        <span></span>      
      </div>
      <div class="h-2 bg-text" :style="{ flexGrow: modelValue.carbohydrates }">
        <span></span>
        <span></span>      
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
})

const first = ref(props.modelValue.proteins)
const second = ref(props.modelValue.fats)

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