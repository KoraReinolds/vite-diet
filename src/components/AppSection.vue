<template>
  <div class="bg-white py-4 px-3 flex justify-between">
    <span class="font-bold">{{ props.title }}</span>
    <slot name="headerSide"></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  }
})
</script>
