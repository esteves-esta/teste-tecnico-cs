import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearch = defineStore('search', () => {
  const query = ref('')
  const searchIsVisible = ref(false)

  function search(value: string) {
    query.value = value;

    // TODO - save last 5 searches
  }

  function toogleSearch() {
    searchIsVisible.value = !searchIsVisible.value
  }
  return { query, search, toogleSearch, searchIsVisible }
})
