import type { ProjectListRequest, ProjectListResponse } from "@/shared/models/ProjectList";
import type { Project } from "@/shared//models/Project";
import ProjectHandler from "../utils/ProjectHandler";

function create(project: Project) {
  try {
    ProjectHandler.create(project)

  } catch (error) {
    // alert("Houve um erro ao criar o projeto.")
    console.error(`Error on creating project: ${error}`)

    throw error;
  }
}
function edit(project: Project) {
  try {
    ProjectHandler.edit(project)

  } catch (error) {
    // alert("Houve um erro ao criar o projeto.")
    console.error(`Error on creating project: ${error}`)

    throw error;
  }
}
function get(id: string) {
  try {
    return ProjectHandler.get(id)
  } catch (error) {
    // alert("Houve um erro ao criar o projeto.")
    console.error(`Error on creating project: ${error}`)

    throw error;
  }
}
function list(request: ProjectListRequest): ProjectListResponse {
  try {
    return ProjectHandler.list(request)
  } catch (error) {
    // alert("Houve um erro ao criar o projeto.")
    console.error(`Error on creating project: ${error}`)

    return { projects: [], total: 0 }
  }
}
function toggleFavorite(id: string) {
  try {
    ProjectHandler.toggleFavorite(id)

  } catch (error) {
    // alert("Houve um erro ao criar o projeto.")
    console.error(`Error on creating project: ${error}`)
    // TODO TOAST
    throw error;
  }
}
function remove(id: string) {
  try {
    ProjectHandler.remove(id)

  } catch (error) {
    // alert("Houve um erro ao criar o projeto.")
    console.error(`Error on creating project: ${error}`)

    throw error;
  }
}

export default {
  create, edit, list, toggleFavorite, remove, get
}



