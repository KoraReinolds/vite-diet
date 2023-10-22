<template>
  <table class="table-auto">
  <thead>
    <tr>
      <th
        v-for="col in cols"
        :key="col.value"
        class="w-40 text-sm text-left text-xs text-white bg-text px-2 text-center first:text-left last:text-right"
        v-html="col.value"
      />
    </tr>
  </thead>
  <tbody>
    <tr
      v-for="(row, rowIndex) in rows"
      :key="`row-${rowIndex}`"
    >
      <td
        v-for="(item, colIndex) in row"
        :key="`row-${rowIndex}-${colIndex}`"
        :class="[
          item.editable && '',
          'border border-protein border-x-0 h-8 w-20 text-sm text-left text-sm px-2 text-center first:text-left last:text-right'
        ]"
      >
        <ResizedInput
          v-if="item.editable"
            :model-value="getValue(item)"
          />
        <div
          class="flex justify-end text-secondary"
          v-else-if="item.type === 'icon'"
        >
          <component
            class="cursor-pointer"
            @click="item.onClick($event.target)"
            :is="item.value"
          />
        </div>
        <template v-else>
          {{ getValue(item) }}
        </template>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import ResizedInput from './ResizedInput.vue';
import type { Cell } from '@/interfaces/ICell';

defineEmits(['delete'])
const props = defineProps({
  rows: {
    type: Array as PropType<Cell[][]>,
    required: true,
  },
  cols: {
    type: Array as PropType<Cell[]>,
    required: true,
  }
})

const getValue = (cell: Cell) => {
  if ('precise' in cell) {
    return cell.value.toFixed(cell.precise || 0)
  }
  return `${cell.value}`
}

</script>