
<template>
  <div class="flex items-center w-full bg-proteins h-[27px] px-[10px] rounded-lg">
    <input
      class="w-full bg-proteins text-xs"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
    <SearchIcon />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from './SearchIcon.vue';

defineProps({
  modelValue: {
    type: String,
    required: true,
  }
})

defineEmits<({
  'update:modelValue': [value: string]
})>()

</script>