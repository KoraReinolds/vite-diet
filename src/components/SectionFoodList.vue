
<template>
  <LayoutSection
    :title="`Продукты (${filteredItems.length})`"
  >

    <template #headerSide>
      <div v-if="items.length" class="flex items-center pr-2 space-x-2">
        <SearchField
          class="md:h-8"
          v-model.trim="search"
        />
        <IconAdd
          class="
            ml-auto cursor-pointer rounded-lg
            w-4 h-4
            hover:bg-main_light
          "
          @click="$emit('add')"
        />
      </div>
      <div v-else>
        <AppButton type="main" text="Добавить" @click="$emit('add')" /> 
      </div>
    </template>

    <template #body>
      <LayoutTable
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
            class="
              h-10
              cursor-pointer
              text-sm text-center
              border border-protein border-x-0
            "
            @click="$emit('select', item.name)"
          >
            <td class="px-2 text-start">{{ item.name }}</td>
            <td class="px-2">{{ item.kcal }}</td>
            <td class="px-2">{{ item.proteins }}</td>
            <td class="px-2">{{ item.fats }}</td>
            <td class="px-2">{{ item.carbohydrates }}</td>
            <td class="px-2">
              <IconAdd
                class="
                  ml-auto cursor-pointer rounded-lg
                  w-4 h-4
                  hover:bg-main_light
                "
                @click.stop="$emit('delete', item.name)"
              />
            </td>
          </tr>
        </template>
      </LayoutTable> 
      <div v-else-if="items.length">
        Не найдено продуктов, удовлетворяющих условиям поиска.
      </div>
    </template>

  </LayoutSection>
</template>

<script setup lang="ts">
import { ref, type PropType, computed } from 'vue';
import LayoutSection from './LayoutSection.vue';
import LayoutTable from './LayoutTable.vue';
import IconAdd from '@/components/IconAdd.vue'
import SearchField from './SearchField.vue';
import AppButton from './AppButton.vue';
import type { IProductData } from '@/interfaces/IData';

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

const filteredItems = computed(() => {
  const regex = new RegExp(`(?=.*${search.value.split('').join(')(?=.*')})`, 'i')

  const filteredArray = props.items.filter(item => regex.test(item.name))

  return filteredArray
})

</script>