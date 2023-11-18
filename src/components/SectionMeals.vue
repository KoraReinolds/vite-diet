<template>
  <LayoutSection
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
        class="
          flex gap-2
          lg:flex-col
          
          text-sm font-bold
        "
      >
        <span
          v-for="name in list"
          :key="name"
          @click="$emit('select', name)"
          class="
            h-6 md:h-8
            w-full bg-text text-white
            flex items-center justify-center
            hover:bg-main cursor-pointer
          "
        >
          {{ name }}
        </span>
      </div>
    </template>

  </LayoutSection>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import LayoutSection from './LayoutSection.vue';
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