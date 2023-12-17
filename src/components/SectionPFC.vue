<template>
  <LayoutSection
    title="Соотношение БЖУ"
  >
    <template #headerSide>
      <div class="text-sm text-right flex flex-wrap justify-end items-center space-x-1">
        <span>
          <span> {{ curentValue.toFixed() }}&nbsp;/&nbsp;</span>
          <ResizedInput
            :modelValue="maxValue"
            @update:modelValue="$emit('update:maxValue', +$event)"
          />
        </span>
        <span>&nbsp;ккал</span>
      </div>
    </template>
    <template #body>
      <BarRange
        :model-value="percentRatio"
        @update:model-value="$emit('update:percentRatio', $event)"
      >
        <div class="h-3 flex items-center w-full overflow-hidden">
          <BarPercent
            v-for="(val, i) in percentRatio"
            :key="displayNames[i]"
            :percentValue="val"
            :selectedName="selectedName"
            :filled="filledRatio[i]"
            :color="colors[i]"
          />
        </div>
      </BarRange>

      <div class="flex-col font-bold text-sm justify-between">
        <div
          v-for="(name, i) in displayNames"
          :key="name"
          class="flex items-center relative"
        >
          <div class="w-72 flex justify-between mr-4">
            <span>
              {{ name }}
            </span>
            <span>
              {{ totalMacronutrietnSum(filledRatio[i]) }}
              / {{ (percentRatio[i] * 100).toFixed() }}
              <span class="text-xs">%</span>
            </span>
          </div>

          <div
            class="flex items-center h-2 w-full overflow-hidden relative"
          >
            <BarPercent
              :percentValue="percentRatio[i]"
              :selectedName="selectedName"
              :filled="filledRatio[i]"
              :color="colors[i]"
            />
          </div>
        </div>
      </div>
    </template>
  </LayoutSection>
</template>

<script setup lang="ts">
import LayoutSection from './LayoutSection.vue'
import ResizedInput from '@/components/ResizedInput.vue';
import BarRange from '@/components/BarRange.vue';
import BarPercent from '@/components/BarPercent.vue';
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
  'update:percentRatio': [value: number[]],
  'update:maxValue': [value: number],
})>()

const totalMacronutrietnSum = (obj: Record<string, number>) => {
  const sum = Object.values(obj).reduce((c, p) => c+p, 0)
  if (sum > 1) return '>99'
  else return (sum * 100).toFixed(0)
}

</script>