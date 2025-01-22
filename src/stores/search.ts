import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearch = defineStore('counter', () => {
  const query = ref('')

  function search(value: string) {
    query.value = value;

    // TODO - save last 5 searches
  }

  return { query, search }
})
