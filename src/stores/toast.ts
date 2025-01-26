import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToast = defineStore('toast', () => {
  class Toast {
    title = '';
    message?: string = '';
    duration?: number;
  }
  const toast = ref<Toast>(new Toast())
  const open = ref(false)

  function closeToast() {
    open.value = false;
    toast.value = new Toast();
  }

  function setToast(info: Toast) {
    open.value = true;
    toast.value.title = info.title;
    toast.value.message = info.message;
    toast.value.duration = info.duration || 1000 * 5;
  }
  return { open, toast, setToast, closeToast }
})
