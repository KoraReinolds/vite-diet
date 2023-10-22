<template>
  <AppSection
    :title="`Приемы пищи (${mealCount}) ${ mealName ? ` > ${mealName}` : '' }`"
  >
  <template v-slot:headerSide>
    <AppButton
      v-if="isMealNew"
      text="Отмена"
      type="red"
      @click="deleteMeal"
    />
  </template>
  <template v-slot:body>
    <TableLayout
      v-if="mealName"
      :rows="rows"
      :cols="cols"
      @delete="removeFood"
    />
    <div v-else-if="mealCount" class="flex items-center space-x-2 h-6">
      <div
        class="flex items-center justify-center w-full text-xs text-center bg-text h-full text-white font-bold cursor-pointer hover:bg-main"
        v-for="meal in meals"
        :key="meal.name"
        @click="mealName = meal.name"
      >
        <span>{{ meal.name }}</span>
      </div>
    </div>
    <div
      v-if="mealName && !isMealNew"
      class="flex justify-end space-x-2"
    >
      <AppButton
        text="Назад"
        @click="mealName = ''"
      />
      <AppButton
        text="Удалить"
        type="red"
        @click="deleteMeal"
      />
    </div>
    <div v-else>
      Для расчета нового приема пищи добавьте продукты из списка ниже  
    </div>
  </template>
  </AppSection>
</template>

<script setup lang="ts">
import AppSection from '@/components/AppSection.vue'
import { useDP } from '@/composition/useDP';
import type { IDietPlan } from '@/interfaces/IDietPlan';
import { computed, ref, type PropType, type ComputedRef } from 'vue';
import TableLayout from './TableLayout.vue';
import AppButton from './AppButton.vue';
import { IconCell, NumberCell, StringCell } from '@/classes/Cell';
import type { Cell } from '@/interfaces/ICell';
import DeleteIcon from '@/components/DeleteIcon.vue'

const props = defineProps({
  dp: {
    type: Object as PropType<IDietPlan>,
    required: true,
  }
})

const mealName = ref(props.dp.get('newMeal') ? 'newMeal' : '')
const isMealNew = computed(() => mealName.value === 'newMeal')
const meal = computed(() => props.dp.get(mealName.value))
const removeFood = (name: string) => meal.value?.remove(name)
const deleteMeal = () => {
  props.dp.remove(mealName.value)
  mealName.value = ''
}
const cols: ComputedRef<Cell[]> = computed(() => isMealNew.value
  ? [
      new StringCell('Название'),
      new StringCell('Порция(г)'),
      new StringCell('Мин'),
      new StringCell('Макс'),
      new StringCell(''),
    ]
  : [
      new StringCell('Название'),
      new StringCell('Порция(г)'),
      new StringCell('Б'),
      new StringCell('Ж'),
      new StringCell('У'),
      new StringCell('Ккал'),
    ]
)

const rows = computed(() => {
  return meal.value?.getAllList().map((item) => {
    return isMealNew.value
      ? [
        new StringCell(item.name),
        new NumberCell(item.chunks, true),
        new NumberCell(0, true),
        new NumberCell(Math.floor(props.dp.getNewMeal().getEnergy() / item.getEnergyChunk()), true),
        new IconCell(DeleteIcon, () => meal.value?.remove(item.name) ),
      ] : [
        new StringCell(item.name),
        new NumberCell(item.chunks),
        new NumberCell(item.proteins, false, 1),
        new NumberCell(item.fats, false, 1),
        new NumberCell(item.carbohydrates, false, 1),
        new NumberCell(item.getEnergy(), false, 1),
      ]
  }) || []
})

const { mealCount, meals } = useDP(props.dp)

</script>