<template>
  <button :class="[color, 'border rounded px-1 h-6 text-sm font-bold']">{{ text }}</button>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<'default' | 'red' | 'main'>,
    required: false,
    default: 'default',
  },
  text: {
    type: String,
    required: true,
  }
})

const color = computed(() => {
  if (props.type === 'red') return 'text-secondary border-secondary'
  if (props.type === 'main') return 'text-main border-main'

  return 'text-text border-text'
})
</script>