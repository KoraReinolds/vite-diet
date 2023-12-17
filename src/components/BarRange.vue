<template>
  <div class="flex relative">
    <input
      v-for="val, index in values"
      :key="'range-input-' + index"
      class="absolute w-full bottom-0"
      min="0"
      max="1"
      v-model="values[index]"
      step="0.01"
      type="range"
    >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { type PropType, watch, ref } from 'vue';

const emit = defineEmits<({
  'update:modelValue': [value: number[]],
})>()

const props = defineProps({
  modelValue: {
    type: Array as PropType<number[]>,
    required: true,
  },
})

const values = ref(
  [...props.modelValue]
    .map((cur, i, arr) => {
      if (i) arr[i] = arr[i - 1] + cur
      return cur + (arr[i - 1] || 0)
    })
    .slice(0, -1),
)

watch(values, (newValue) => {
  const sortedValues = [...newValue].map(v => +v).sort()
  sortedValues.push(1)
  for (let i = sortedValues.length - 1; i > 0; i--) {
    sortedValues[i] -= sortedValues[i - 1]
  }
  emit('update:modelValue', sortedValues)
}, { deep: true })

</script>