import type { ProjectListRequest, ProjectListResponse } from "@/shared/models/ProjectList";
import type { Project } from "@/shared//models/Project";
import ProjectHandler from "../utils/ProjectHandler";
import { useToast } from '@/stores/toast'

function create(project: Project) {
  try {
    ProjectHandler.create(project)

  } catch (error) {
    console.error(`Error on creating project: ${error}`)
    const toastStore = useToast();
    toastStore.setToast({
      title: 'Houve um erro ao criar o projeto.',
      message: 'Tente novamente',
    })
    throw error;
  }
}
function edit(project: Project) {
  try {
    ProjectHandler.edit(project)

  } catch (error) {
    console.error(`Error on creating project: ${error}`)
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
    console.error(`Error on creating project: ${error}`)
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
    console.error(`Error on creating project: ${error}`)
    const toastStore = useToast();
    toastStore.setToast({
      title: 'Houve um erro ao consultar os projetos.',
      message: 'Tente novamente',
    })
    return { projects: [], total: 0 }
  }
}
function toggleFavorite(id: string) {
  try {
    ProjectHandler.toggleFavorite(id)

  } catch (error) {
    console.error(`Error on creating project: ${error}`)
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
    console.error(`Error on creating project: ${error}`)
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



