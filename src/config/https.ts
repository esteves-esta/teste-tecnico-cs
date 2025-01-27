import { AxiosError, default as http } from 'axios'
import { useToast } from '@/stores/toast'
import { useProgress } from '@/stores/progress'
import { storeToRefs } from 'pinia'

if (import.meta.env.MODE === "development")
  http.defaults.baseURL = "http://localhost:8888/api/"
else
  http.defaults.baseURL = `"https://netlify-functions--gerenciador-projetos-teste.netlify.app/api/`

export function createHttp() {
  const toastStore = useToast()
  const { progress } = storeToRefs(useProgress())

  http.interceptors.request.use((config) => {
    if (!progress.value) {
      progress.value = true
    }
    return config
  })

  http.interceptors.response.use(
    (response) => {
      if (response.config.method != 'get') {
        toastStore.setToast({
          title: 'Salvo',
          message: response.headers.message ? response.headers.message : 'Alterações Salvas',
        })
      }
      progress.value = false
      return response
    },
    (error: AxiosError) => {
      if (error.status === 413) {

        toastStore.setToast({
          title: 'Tente novamente',
          message: 'A imagem  é muito grande, troque ou remova a imagem.',
        })

      } else {
        let errorMessage = 'Ocorreu um erro na requisição.'
        if (typeof error.response?.data === 'string') errorMessage = error.response?.data

        toastStore.setToast({
          title: 'Erro',
          message: errorMessage,
        })
      }
      progress.value = false
      return Promise.reject(error)
    }
  )
}

export default http
