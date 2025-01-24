import SearchHandler from "../utils/SearchHandler";
import { useToast } from '@/stores/toast'

function save(query: string) {
  try {
    SearchHandler.saveHistory(query)

  } catch (error) {
    console.error(`Error on saving search history: ${error}`)
    const toastStore = useToast();
    toastStore.setToast({
      title: 'Erro ao salvar histórico',
      message: 'Tente novamente',
    })
    throw error;
  }
}
function get() {
  try {
    return SearchHandler.getHistory()

  } catch (error) {
    console.error(`Error on getting search history: ${error}`)
    const toastStore = useToast();
    toastStore.setToast({
      title: 'Erro ao consultar o histórico',
      message: 'Tente novamente',
    })
    throw error;
  }
}
function remove(query: string) {
  try {
    SearchHandler.remove(query)

  } catch (error) {
    console.error(`Error on removing item from search history: ${error}`)
    const toastStore = useToast();
    toastStore.setToast({
      title: 'Erro ao remover um item do histórico',
      message: 'Tente novamente',
    })
    throw error;
  }
}
export default {
  save, get, remove
}
