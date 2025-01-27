import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProgress = defineStore('progress', () => {
  const progress = ref(false)

  return { progress }
})
