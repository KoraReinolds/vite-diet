<template>
  <AppSection
    :title="title"
  >

    <template #headerSide>
      <AppButton
        type="red"
        text="Отмена"
        @click="$emit('cancel')"
      />
    </template>

    <template #body>
      <TableLayout>
        <template #header>
          <th
            v-for="name in ['Название','Порций','Мин','Макс','']"
            :key="`th-${name}`"
            class="px-2 first:text-left last:text-right"
          >
            {{ name }}
          </th>
        </template>
        <template #body>
          <tr
            v-for="item in items"
            :key="item.name"
            class="text-sm h-8 text-center border border-protein border-x-0"
          >
            <td class="px-2 text-start">{{ item.name }}</td>
            <td class="px-2">
              <ResizedInput
                :modelValue="item.portions"
              />
            </td>
            <td class="px-2">
              <ResizedInput
                :modelValue="item.min"
              />
            </td>
            <td class="px-2">
              <ResizedInput
                :modelValue="item.max"
              />
            </td>
            <td class="px-2">
              <DeleteIcon
                class="ml-auto"
                @click="$emit('delete', item.name)"
              />
            </td>
          </tr>
        </template>
      </TableLayout> 
    </template>

  </AppSection>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import AppSection from './AppSection.vue';
import TableLayout from './TableLayout.vue';
import type { IMealRow } from '@/interfaces/ITable';
import AppButton from './AppButton.vue';
import DeleteIcon from './DeleteIcon.vue';
import ResizedInput from './ResizedInput.vue';

defineEmits<({
  cancel: [],
  delete: [value: string], 
})>()

defineProps({
  items: {
    type: Array as PropType<IMealRow[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

</script>