import { ref, type Ref } from "vue"

class BodyParams {
  weight: Ref<number> = ref(0)
  
  constructor(weight: number) {
    this.weight.value = weight
  }
}

export { BodyParams } 