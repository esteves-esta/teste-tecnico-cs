import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearch = defineStore('search', () => {
  const query = ref('')
  const searchIsVisible = ref(false)

  function toogleSearch() {
    searchIsVisible.value = !searchIsVisible.value
  }
  return { query, toogleSearch, searchIsVisible }
})
