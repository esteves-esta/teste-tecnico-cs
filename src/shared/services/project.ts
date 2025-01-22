import type { ProjectListRequest, ProjectListResponse } from "@/shared/models/ProjectList";
import type { Project } from "@/shared//models/Project";
import ProjectHandler from "../utils/ProjectHandler";

function create(project: Project) {
  try {
    ProjectHandler.create(project)
    return true;
  } catch (error) {
    alert("Houve um erro ao criar o projeto.")
    console.error(`Error on creating project: ${error}`)
    // TODO TOAST
    return false;
  }
}
function edit(project: Project) {
  try {
    ProjectHandler.edit(project)
    return true;
  } catch (error) {
    alert("Houve um erro ao criar o projeto.")
    console.error(`Error on creating project: ${error}`)
    // TODO TOAST
    return false;
  }
}
function list(request: ProjectListRequest): ProjectListResponse {
  try {
    return ProjectHandler.list(request)
  } catch (error) {
    alert("Houve um erro ao criar o projeto.")
    console.error(`Error on creating project: ${error}`)
    // TODO TOAST
    return { projects: [], total: 0 }
  }
}
function toggleFavorite(id: string) {
  try {
    ProjectHandler.toggleFavorite(id)
    return true;
  } catch (error) {
    alert("Houve um erro ao criar o projeto.")
    console.error(`Error on creating project: ${error}`)
    // TODO TOAST
  }
}
function remove(id: string) {
  try {
    ProjectHandler.remove(id)
    return true;
  } catch (error) {
    alert("Houve um erro ao criar o projeto.")
    console.error(`Error on creating project: ${error}`)
    // TODO TOAST
    return false;
  }
}

export default {
  create, edit, list, toggleFavorite, remove
}



