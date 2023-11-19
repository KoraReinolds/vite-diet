<template>
  <LayoutSection
    :title="title + ` > ${foodInfo.name || 'Новый продукт'}`"
  >
    <template #body>
      <div>
        <div
          v-for="(val, key) in modelValue"
          :key="key"
          class="h-10 flex items-center m-0 justify-between"
        >
          <label
            :for="key"
          >
            {{ displayNames[key] }}:
          </label>
          <div
            class="
              flex items-center
              bg-proteins
              h-[27px] md:h-8
              px-[10px] rounded-lg
            "
          >
            <input
              class="w-full bg-proteins text-xs"
              :type="(typeof val === 'number') ? 'number' : 'text'" 
              :id="key"
              v-model="foodInfo[key]"
            />
        </div>
        </div>
      </div>
      <div
        class="flex space-x-2 justify-end"
      >
        <AppButton
          text="Сохранить изменения"
          type="main"
          @click="save"
        />
        <AppButton
          text="Отмена"
          type="red"
          @click="$emit('cancel')"
        />
      </div>
    </template>
  </LayoutSection>
</template>

<script setup lang="ts">
import type { INewFoodData } from '@/interfaces/ITable';
import LayoutSection from './LayoutSection.vue';
import { ref, type PropType } from 'vue';
import AppButton from './AppButton.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Object as PropType<INewFoodData>,
    required: true,
  },
})

const displayNames = {
  name: 'Название',
  proteins: 'Белки',
  fats: 'Жиры',
  carbohydrates: 'Углеводы',
  chunkSize: 'Размер порции',
}
const foodInfo = ref({ ...props.modelValue })

const emit = defineEmits<({
  'update:modelValue': [value: INewFoodData],
  save: [],
  cancel: [],
})>()

function save() {
  emit('update:modelValue', foodInfo.value) 
  emit('save') 
}

</script>