<template>
  <div
    class="h-2 bg-text flex"
    :style="{ flex: percentValue }"
  >
    <span
      v-for="(innerVal, key) in filled"
      :key="key"
      class="h-full inline-block overflow-hidden shrink-0"
      :data-name="key"
      :class="key === selectedName ? 'bg-main' : color"
      :style="{
        width: `${ innerVal / percentValue * 100 }%`,
      }"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

defineProps({
  percentValue: {
    type: Number,
    required: true,
  },
  selectedName: {
    type: String,
  },
  filled: {
    type: Object as PropType<Record<string, number>>,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
})

defineEmits<({
  'update:percentRatio': [value: number[]],
  'update:maxValue': [value: number],
})>()

const totalMacronutrietnSum = (obj: Record<string, number>) => {
  const sum = Object.values(obj).reduce((c, p) => c+p, 0)
  if (sum > 1) return '>99'
  else return (sum * 100).toFixed(0)
}

</script>