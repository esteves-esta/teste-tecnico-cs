import type { ProjectListRequest, ProjectListResponse } from "@/shared/models/ProjectList";
import type { Project } from "@/shared//models/Project";
import ProjectHandler from "../utils/ProjectHandler";
import { useToast } from '@/stores/toast'

function create(project: Project) {
  try {
    ProjectHandler.create(project)

  } catch (error) {
    let message = 'Tente novamente';
    if ((error as Error).message.includes('exceeded the quota'))
      message = "A imagem muito grande, troque ou remova a imagem."
    const toastStore = useToast();
    toastStore.setToast({
      title: 'Houve um erro ao criar o projeto.',
      message,
    })
    throw error;
  }
}
function edit(project: Project) {
  try {
    ProjectHandler.edit(project)

  } catch (error) {
    const toastStore = useToast();
    toastStore.setToast({
      title: 'Houve um erro ao salvar o projeto.',
      message: 'Tente novamente',
    })
    throw error;
  }
}
function get(id: string) {
  try {
    return ProjectHandler.get(id)
  } catch (error) {
    const toastStore = useToast();
    toastStore.setToast({
      title: 'Houve um erro ao consultar o projeto.',
      message: 'Tente novamente',
    })
    throw error;
  }
}
function list(request: ProjectListRequest): ProjectListResponse {
  try {
    return ProjectHandler.list(request)
  } catch (error) {
    const err = error as Error;
    const toastStore = useToast();
    toastStore.setToast({
      title: 'Houve um erro ao consultar os projetos.',
      message: `Ocorreu o seguinte erro: ${err.name}`,
    })
    return { projects: [], total: 0 }
  }
}
function toggleFavorite(id: string) {
  try {
    ProjectHandler.toggleFavorite(id)

  } catch (error) {
    const toastStore = useToast();
    toastStore.setToast({
      title: 'Houve um erro ao favoritar o projeto.',
      message: 'Tente novamente',
    })
    throw error;
  }
}
function remove(id: string) {
  try {
    ProjectHandler.remove(id)

  } catch (error) {
    const toastStore = useToast();
    toastStore.setToast({
      title: 'Houve um erro ao remover o projeto.',
      message: 'Tente novamente',
    })
    throw error;
  }
}

export default {
  create, edit, list, toggleFavorite, remove, get
}



