<template>
  <AppSection
    :title="title"
  >
  
    <template #headerSide>
      <AppButton
        type="red"
        text="Очистить"
        @click="$emit('clear')"
      />
    </template>

    <template #body>
      <div
        class="flex gap-2 h-6 text-sm font-bold"
      >
        <span
          v-for="name in list"
          :key="name"
          @click="$emit('select', name)"
          class="w-full bg-text text-white flex items-center justify-center hover:bg-main cursor-pointer"
        >
          {{ name }}
        </span>
      </div>
    </template>

  </AppSection>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import AppSection from './AppSection.vue';
import AppButton from './AppButton.vue';

const emit = defineEmits<({
  select: [value: string], 
  clear: [], 
})>()

defineProps({
  list: {
    type: Array as PropType<string[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

</script>