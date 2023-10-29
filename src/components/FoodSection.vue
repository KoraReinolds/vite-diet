
<template>
  <AppSection
    :title="`Продукты (${fl.getAllList().length})`"
  >
    <template v-slot:headerSide>
      <div class="flex items-center pr-2 space-x-2">
        <SearchField v-model="search" />
        <AddIcon />
      </div>
    </template>
    <template v-slot:body>
      <TableLayout
        :cols="cols"
        :rows="rows"
        v-model="selected"
      />
    </template>
  </AppSection>
</template>

<script setup lang="ts">
import { computed, ref, type ComputedRef, type PropType, watch } from 'vue';
import AppSection from './AppSection.vue';
import type { FoodList } from '@/classes/FoodList';
import TableLayout from './TableLayout.vue';
import type { Cell } from '@/interfaces/ICell';
import { IconCell, NumberCell, StringCell } from '@/classes/Cell';
import AddIcon from '@/components/AddIcon.vue'
import SearchField from './SearchField.vue';
import type { Food } from '@/classes/Food';

const emits = defineEmits(['change'])
const props = defineProps({
  fl: {
    type: Object as PropType<FoodList>,
    required: true,
  }
})

const cols: ComputedRef<Cell[]> = computed(() => [
  new StringCell('Название'),
  new StringCell('Порция(г)'),
  new StringCell('Б'),
  new StringCell('Ж'),
  new StringCell('У'),
  new StringCell(''),
])

const search = ref('')
const selectedFilter = ((food: Food) => !selected.value[food.name])
const searchFilter = ((food: Food) => food.name.startsWith(search.value))
const filteredFoodList = computed(() => {
  let list = props.fl.getAllList()
  if (search.value) list = list.filter(searchFilter)
  return list.filter(selectedFilter)
})

const rows = computed(() => {
  return filteredFoodList.value.map((item) => {
    return [
      new StringCell(item.name),
      new NumberCell(item.chunkSize),
      new NumberCell(item.proteinsChunkPer100, false, 1),
      new NumberCell(item.fatsChunkPer100, false, 1),
      new NumberCell(item.carbohydratesChunkPer100, false, 1),
      new IconCell(AddIcon, () => {} ),
    ]
  }) || []
})

const selected = ref(props.fl.selected)

watch(selected, (val) => {
  props.fl.setSelected(val)
  emits('change')
})

</script>

