
<template>
  <AppSection
    :title="`Продукты (${filteredItems.length})`"
  >

    <template #headerSide>
      <div v-if="items.length" class="flex items-center pr-2 space-x-2">
        <SearchField v-model.trim="search" />
        <AddIcon @click="$emit('add')" />
      </div>
      <div v-else>
        <AppButton type="main" text="Добавить" @click="$emit('add')" /> 
      </div>
    </template>

    <template #body>
      <TableLayout
        v-if="filteredItems.length"
      >
        <template #header>
          <th
            v-for="name in ['Название','Ккал','Белки','Жиры','Углеводы','']"
            :key="`th-${name}`"
            class="px-2 first:text-left last:text-right"
          >
            {{ name }}
          </th>
        </template>
        <template #body>
          <tr
            v-for="item in filteredItems"
            :key="item.name"
            class="text-sm h-8 text-center border border-protein border-x-0"
            @click="$emit('select', item.name)"
          >
            <td class="px-2 text-start">{{ item.name }}</td>
            <td class="px-2">{{ item.kcal }}</td>
            <td class="px-2">{{ item.proteins }}</td>
            <td class="px-2">{{ item.fats }}</td>
            <td class="px-2">{{ item.carbohydrates }}</td>
            <td class="px-2">
              <AddIcon
                class="ml-auto"
                @click.stop="$emit('delete', item.name)"
              />
            </td>
          </tr>
        </template>
      </TableLayout> 
      <div v-else-if="items.length">
        Не найдено продуктов, удовлетворяющих условиям поиска.
      </div>
    </template>

  </AppSection>
</template>

<script setup lang="ts">
import { ref, type PropType, computed } from 'vue';
import AppSection from './AppSection.vue';
import TableLayout from './TableLayout.vue';
import AddIcon from '@/components/AddIcon.vue'
import SearchField from './SearchField.vue';
import type { IProductData } from '@/interfaces/ITable';
import AppButton from './AppButton.vue';

defineEmits<({
  'delete': [value: string],
  'select': [value: string],
  'add': [],
})>()

const props = defineProps({
  items: {
    type: Array as PropType<IProductData[]>,
    required: true,
  }
})

const search = ref('')
const searchFilter = ((item: IProductData) => item.name.startsWith(search.value))
const filteredItems = computed(() => {
  return props.items.filter(searchFilter)
})

</script>

