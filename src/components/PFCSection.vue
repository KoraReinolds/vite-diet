<template>
  <AppSection
    title="Соотношение БЖУ"
  >
    <template v-slot:headerSide>
      <div class="text-right flex flex-wrap justify-end items-center space-x-1">
        <span class="text-sm">Всего&nbsp;ккал </span>
        <span>
          <span> ({{ curentEnergy }}&nbsp;/&nbsp;</span>
          <ResizedInput v-model="totalEnergy" />
          <span>)</span>
        </span>
      </div>
    </template>
    <template v-slot:body>
      <PFCBar
        v-model="pfcRatio"
        :filled="actualPFC"
      />
      <div class="font-bold text-sm flex justify-between">
        <span>Белки - {{ (pfcRatio.proteins * 100).toFixed() }}%</span>
        <span>Жиры - {{ (pfcRatio.fats * 100).toFixed() }}%</span>
        <span>Углеводы - {{ (pfcRatio.carbohydrates * 100).toFixed() }}%</span>
      </div>
    </template>
  </AppSection>
</template>

<script setup lang="ts">
import AppSection from './AppSection.vue'
import useDP from '@/store/useDP';
import ResizedInput from '@/components/ResizedInput.vue';
import PFCBar from '@/components/PFCBar.vue';
import { storeToRefs } from 'pinia';

const { totalEnergy, curentEnergy, pfcRatio, actualPFC } = storeToRefs(useDP())

</script>