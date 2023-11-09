import { ref } from "vue"

const useKeyValueStorage = () => {
    
  const storage = ref<Record<string, number>>({})
  const addToStorage = ({ name, value }: { name: string, value: number }) => storage.value[name] = value
  const removeFromStorage = (name: string) => delete storage.value[name]

  return { storage, addToStorage, removeFromStorage }
}

export { useKeyValueStorage }
