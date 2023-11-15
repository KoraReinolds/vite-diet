import { computed } from "vue"
import { resultData } from "./result"
import { useReactive } from "@/composables/useReactive"
import dietPlan from "@/layerClasses.ts/dietPlan"

const pfcRatio = useReactive(
  dietPlan.getPFCRatio,
  dietPlan.setPFCRatio
)

const pfcRatioArr = computed({
  get: () => Object.values(pfcRatio.value),
  set: ([proteins, fats, carbohydrates]) => pfcRatio.value = {
    proteins, fats, carbohydrates
  }
})

const mealsPFC = computed(() => {
  resultData.value
  return dietPlan.getFilledPFCRatio()
})

export {
  pfcRatioArr,
  mealsPFC,
}