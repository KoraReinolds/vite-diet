<template>
  <header class="h-16 mx-3 md:mx-4 text-2xl flex items-center">
    <div class="w-full flex justify-between items-center">
      <div>
        <span class="text-main font-a">DIET</span>
        <span class="text-secondary font-j">Planer</span>
      </div>
      <div class="flex gap-4 sm:hidden">
        <slot></slot>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>