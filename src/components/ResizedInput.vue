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
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
      type="number"
      :min="min"
      :max="max"
    >
  </span>
</template>

<script setup lang="ts">
defineEmits<({
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
</script>