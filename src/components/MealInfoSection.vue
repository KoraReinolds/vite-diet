<template>
  <AppSection
    :title="title"
  >
  
    <template #body>
      <TableLayout>
        <template #header>
          <th
            v-for="name in ['Название','Порций','Белки','Жиры','Углеводы','Ккал']"
            :key="`th-${name}`"
            class="px-2 first:text-left last:text-right"
          >
            {{ name }}
          </th>
        </template>
        <template #body>
          <tr
            v-for="item in infoData"
            :key="item.name"
            class="text-sm h-8 text-center border border-protein border-x-0"
          >
            <td class="px-2 text-start">{{ item.name }}</td>
            <td class="px-2">{{ item.chunks }}</td>
            <td class="px-2">{{ item.proteins }}</td>
            <td class="px-2">{{ item.fats }}</td>
            <td class="px-2">{{ item.carbohydrates }}</td>
            <td class="px-2 text-end">{{ item.kcal }}</td>
          </tr>
        </template>
      </TableLayout>

      <div
        class="flex justify-end"
      >
        <AppButton
          type="red"
          text="Назад"
          @click="$emit('back')"
        />
      </div>
    </template>

  </AppSection>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import AppSection from './AppSection.vue';
import AppButton from './AppButton.vue';
import type { IMealInfoData } from '@/interfaces/ITable';
import TableLayout from './TableLayout.vue';

const emit = defineEmits<({
  back: [], 
})>()

defineProps({
  infoData: {
    type: Object as PropType<IMealInfoData[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

</script>