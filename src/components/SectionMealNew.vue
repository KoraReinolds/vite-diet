<template>
  <LayoutSection
    :title="title"
  >

    <template #body>
      <LayoutTable>
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
            class="text-sm h-10 text-center border border-protein border-x-0"
          >
            <td class="px-2 text-start">{{ item.name }}</td>
            <td class="px-2">
              <ResizedInput
                :min="1"
                :modelValue="item.portions"
                @update:model-value="updatePortions(item.name, +$event)"
              />
            </td>
            <td class="px-2">
              <ResizedInput
                :min="1"
                :modelValue="item.min"
                @update:model-value="updateMin(item.name, +$event)"
              />
            </td>
            <td class="px-2">
              <ResizedInput
                :min="1"
                :modelValue="item.max"
                @update:model-value="updateMax(item.name, +$event)"
              />
            </td>
            <td class="px-2">
              <IconDelete
                class="ml-auto cursor-pointer w-4 h-4 shr"
                @click="$emit('delete', item.name)"
              />
            </td>
          </tr>
        </template>
      </LayoutTable>
      <div
        class="flex gap-2 justify-end"
      >
        <AppButton
          type="main"
          text="Сохранить"
          @click="$emit('save')"
        />
        <AppButton
          type="red"
          text="Отмена"
          @click="$emit('cancel')"
        />
      </div>
    </template>

  </LayoutSection>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import LayoutSection from './LayoutSection.vue';
import LayoutTable from './LayoutTable.vue';
import AppButton from './AppButton.vue';
import IconDelete from './IconDelete.vue';
import ResizedInput from './ResizedInput.vue';
import type { IMealEditableData } from '@/interfaces/IData';

const emit = defineEmits<({
  save: [],
  cancel: [],
  delete: [value: string], 
  changeMax: [value: { name: string, value: number }], 
  changeMin: [value: { name: string, value: number }], 
})>()

const updateMin = (name: string, value: number) => {
  emit('changeMin', { name, value })
}

const updateMax = (name: string, value: number) => {
  emit('changeMax', { name, value })
}

const updatePortions = (name: string, value: number) => {
  updateMax(name, value)
  updateMin(name, value)
}

defineProps({
  items: {
    type: Array as PropType<IMealEditableData[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

</script>