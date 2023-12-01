<template>
  <div class="relative">
    <span
      v-if="value"
      class="
        absolute
        w-5 h-5
        bg-secondary rounded-full text-white text-xs
        flex items-center justify-center
        -top-3 -left-3
      "
    >
      {{ value }}
    </span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    value: {
      type: Number,
      required: true,
    }
  })
</script>