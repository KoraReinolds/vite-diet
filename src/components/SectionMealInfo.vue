<template>
  <LayoutSection
    :title="title"
  >
  
    <template #body>
      <LayoutTable>
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
            class="text-sm h-10 text-center border border-protein border-x-0"
          >
            <td class="px-2 text-start">{{ item.name }}</td>
            <td class="px-2">{{ item.chunks }}</td>
            <td class="px-2">{{ item.proteins }}</td>
            <td class="px-2">{{ item.fats }}</td>
            <td class="px-2">{{ item.carbohydrates }}</td>
            <td class="px-2 text-end">{{ item.kcal }}</td>
          </tr>
        </template>
      </LayoutTable>

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

  </LayoutSection>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import LayoutSection from './LayoutSection.vue';
import AppButton from './AppButton.vue';
import LayoutTable from './LayoutTable.vue';
import type { IProductData } from '@/interfaces/IData';

const emit = defineEmits<({
  back: [], 
})>()

defineProps({
  infoData: {
    type: Object as PropType<IProductData[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

</script>