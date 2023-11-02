<template>
  <AppSection
    title="Соотношение БЖУ"
  >
    <template v-slot:headerSide>
      <div class="text-right flex flex-wrap justify-end items-center space-x-1">
        <span class="text-sm">Всего&nbsp;ккал </span>
        <span>
          <span> ({{ curentValue.toFixed() }}&nbsp;/&nbsp;</span>
          <ResizedInput
            :modelValue="maxValue"
            @update:modelValue="$emit('update:maxValue', +$event)"
          />
          <span>)</span>
        </span>
      </div>
    </template>
    <template v-slot:body>
      <RangeBar
        :model-value="percentRatio"
        @update:model-value="$emit('update:percentRatio', $event)"
      >
        <div class="h-3 flex items-center w-full overflow-hidden">
          <div
            v-for="(val, i) in percentRatio"
            :key="displayNames[i]"
            class="h-2 bg-text flex"
            :style="{ flex: val }"
          >
              <span
                v-for="(innerVal, key) in filledRatio[i]"
                :key="displayNames[i] + key"
                class="h-full inline-block overflow-hidden shrink-0"
                :data-name="key"
                :class="{
                  [colors[i]]: true,
                  'bg-main': key === selectedName,
                }"
                :style="{
                  width: `${innerVal * curentValue / maxValue / val * 100}%`,
                }"
              ></span>
          </div>
        </div>
      </RangeBar>

      <div class="font-bold text-sm flex justify-between">
        <span
          v-for="(name, i) in displayNames"
          :key="name"
        >
          {{ name }} - {{ (percentRatio[i] * 100).toFixed() }}%
        </span>
      </div>
    </template>
  </AppSection>
</template>

<script setup lang="ts">
import AppSection from './AppSection.vue'
import ResizedInput from '@/components/ResizedInput.vue';
import RangeBar from '@/components/RangeBar.vue';
import { type PropType } from 'vue';

defineProps({
  selectedName: {
    /* Name of the selected section */
    type: String,
  },
  filledRatio: {
    /*
      Sizes of each section 
      [{
        [section name]: [size of the section (0 ... 1)]
      }, ...]
    */
    type: Array as PropType<Record<string, number>[]>,
    required: true,
  },
  percentRatio: {
    /* max size of each section */
    type: Object as PropType<number[]>,
    required: true,
  },
  displayNames: {
    /* names of each section */
    type: Object as PropType<string[]>,
    required: true,
  },
  colors: {
    /* colors for each section */
    type: Object as PropType<string[]>,
    required: true,
  },
  curentValue: {
    type: Number,
    required: true, 
  },
  maxValue: {
    type: Number,
    required: true, 
  },
})

defineEmits<({
  'update:percentRatio': [value: Number[]],
  'update:maxValue': [value: Number],
})>()
  
</script>