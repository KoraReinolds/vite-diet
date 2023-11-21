
<template>
  <div class="
    flex items-center
    w-full bg-proteins
    h-[27px] px-[10px]
    rounded-lg
  ">
    <input
      class="w-full bg-proteins text-xs"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    />
    <IconSearch
      class="md:w-4 md:h-4"
    />
  </div>
</template>

<script setup lang="ts">
import IconSearch from './IconSearch.vue';

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