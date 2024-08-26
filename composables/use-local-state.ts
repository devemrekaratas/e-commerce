export function useLocalState<T>(key: string, defaultValue: T) {

  const state = useState<T>(key, () => defaultValue)
  const loading = ref(true)

  onMounted(() => {
    if (import.meta.client) {
      const storedValue = localStorage.getItem(key)
      if (storedValue !== null) {
        state.value = JSON.parse(storedValue)
      } else if (defaultValue !== undefined) {
        state.value = defaultValue
      }
      setTimeout(() => {
        loading.value = false
      }, 1000);
    }
  })

  watch(state, (newValue) => {
    if (import.meta.client && newValue !== undefined) {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  }, { deep: true })

  return {state, loading}
}