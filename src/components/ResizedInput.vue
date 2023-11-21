<template>
  <span class="relative">
    <span
      class="font-bold"
      aria-hidden="true" 
    >
      {{ modelValue }}
    </span>
    <input
      class="absolute w-full right-0 font-bold text-main"
      ref="input"
      :value="modelValue"
      @input="changeValue"
      @focus="selectAll"
      type="number"
      :min="min"
      :max="max"
    >
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<({
  'update:modelValue': [value: Number]
})>()

defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: false,
  },
  min: {
    type: Number,
    required: false,
  },
})

const input = ref<HTMLInputElement | null>(null)

const changeValue = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', +target?.value || 0)
  if (!target?.value && input.value) {
    input.value.value = '0'
  }
}

const selectAll = () => {
  if (input.value) {
    input.value?.select()
  }
}

</script>