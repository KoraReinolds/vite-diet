<template>
  <div class="
    flex flex-col flex-grow
    bg-white
    py-4 px-3 md:py-5 md:px-4
    gap-3
    md:rounded-md
  ">

    <div class="w-full flex justify-between space-x-2 md:h-8 items-center">
      <span class="font-bold">{{ props.title }}</span>
      <slot name="headerSide"></slot>
    </div>
    
    <slot name="body"></slot>

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
