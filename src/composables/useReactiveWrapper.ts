import { shallowRef } from "vue"

const useReactiveWrapper = <T>(
  getFunction: () => T,
  setFunctions: (() => T)[]
) => {
  const _inner = shallowRef(getFunction())

  const res = [_inner, setFunctions.map(f => () => {
    f()
    _inner.value = getFunction() 
  })]

  return res 
}

export { useReactiveWrapper }