import type { FoodList } from "@/classes/FoodList"
import { ref, watch } from "vue"

const useFL = (fl: FoodList) => {

  const selected = ref(fl.selected)

  watch(selected, (val) => {
    fl.setSelected(val)
  })

  return { selected }
}

export { useFL }