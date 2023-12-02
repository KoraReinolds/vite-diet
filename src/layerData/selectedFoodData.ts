import { getSelected, selectByName } from "@/layerClasses.ts/productList"
import { ref } from "vue"

const selected = ref<Record<string, boolean>>(getSelected())

function reloadSelectedData() {
  selected.value = { ...getSelected() }
}

function togleSelection(name: string) {
  selectByName(name) 
  reloadSelectedData()
}

export default {
  selected,
  togleSelection,
  reloadSelectedData,
}