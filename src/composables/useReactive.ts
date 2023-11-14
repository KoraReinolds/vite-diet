import { computed, shallowRef } from "vue"

const useReactive = <T>(
  getFunction: () => T,
  setFunction: (value: T) => void
) => {
  const _inner = shallowRef(getFunction())
  const result = computed({
    get() { return _inner.value },
    set(value: T) {
      setFunction(value)
      _inner.value = getFunction() 
    }
  })
  
  return result
}

export { useReactive }