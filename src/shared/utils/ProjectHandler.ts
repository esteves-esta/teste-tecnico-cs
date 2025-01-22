import { isAfter } from 'date-fns';
import LocalStorageHandler from "@/shared/utils/LocalStorageHandler";
import constants from "@/shared/utils/constants";
import type { ProjectListRequest, ProjectListResponse, sort_types } from "@/shared/models/ProjectList";
import type { Project } from "@/shared//models/Project";


export default class ProjectHandler {
  static create(project: Project) {
    try {
      const list = LocalStorageHandler.getItem(constants.LOCAL_STORAGE_KEY)

      LocalStorageHandler.setItem(constants.LOCAL_STORAGE_KEY,
        [...list,
          project
        ]
      )
    } catch (error) {

      console.error(`Error: ${error}`)
      throw error;
    }
  }

  static edit(project: Project) {
    try {
      const { list, projectIndex } = ProjectHandler.getListAndProject(project.id);
      if (!projectIndex) return;

      const newList = list.splice(projectIndex, 1)
      LocalStorageHandler.setItem(constants.LOCAL_STORAGE_KEY,
        [...newList,
          project
        ]
      )

    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  static list(request: ProjectListRequest): ProjectListResponse {
    try {
      const list: Project[] = LocalStorageHandler.getItem(constants.LOCAL_STORAGE_KEY)
      if (!list || list.length === 0) return { projects: [], total: 0 }

      let formattedList: Project[] = list
      if (request.favoritesOnly) {
        formattedList = formattedList.filter(item => item.isFavorite);
      }
      if (!!request.query) {
        const query = request.query as string;
        formattedList = formattedList.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
      }

      if (request.sort) {
        formattedList = ProjectHandler.sortList(request.sort, formattedList)
      }

      return { projects: formattedList, total: list.length }

    } catch (error) {
      alert("Houve um erro ao listar projetos.")
      console.error(`Error on listing projects: ${error}`)
      // TODO TOAST
      return { projects: [], total: 0 }
    }
  }

  static toggleFavorite(id: string) {
    try {
      const { list, projectIndex } = ProjectHandler.getListAndProject(id);
      if (!projectIndex) return;
      const project = list[projectIndex];
      project.isFavorite = true;
      const newList = list.splice(projectIndex, 1, project)

      LocalStorageHandler.setItem(constants.LOCAL_STORAGE_KEY, [
        ...newList,
      ])

    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  static remove(id: string) {
    try {
      const { list, projectIndex } = ProjectHandler.getListAndProject(id);
      if (!projectIndex) return;

      const newList = list.splice(projectIndex, 1)
      LocalStorageHandler.setItem(constants.LOCAL_STORAGE_KEY, newList)

    } catch (error) {
      alert("Houve um erro ao remover o projeto.")
      console.error(`Error: ${error}`)
      throw error;
    }
  }
  private static getListAndProject(id: string): ProjectInfo {
    let list: Project[] = [];

    try {
      list = LocalStorageHandler.getItem(constants.LOCAL_STORAGE_KEY)
      if (!list || list.length === 0) return { list, projectIndex: null };

      const itemIndex = list.findIndex(item => item.id === id);

      if (itemIndex < 0) return { list, projectIndex: null };

      return { list, projectIndex: itemIndex }

    } catch (error) {
      console.error(`Error on getting projects: ${error}`)
      return { list, projectIndex: null }
    }

  }

  private static sortList(sort: sort_types, list: Project[]) {
    if (sort === 'default') {
      return list.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    if (sort === 'ending') {
      // Projetos próximos à data de finalização.
      return list.sort(function (a, b) {
        const a_date = new Date(a.date_end as Date)
        const b_date = new Date(b.date_end as Date)
        if (isAfter(a_date, b_date)) {
          return -1;
        }
        if (isAfter(b_date, a_date)) {
          return 1;
        }
        return 0;
      });
    }
    if (sort === 'recent') {
      // Projetos iniciados mais recentemente.

      return list.sort(function (a, b) {
        const a_date = new Date(a.date_end as Date)
        const b_date = new Date(b.date_end as Date)
        if (isAfter(a_date, b_date)) {
          return -1;
        }
        if (isAfter(b_date, a_date)) {
          return 1;
        }
        return 0;
      });
    }
    return list
  }
}

interface ProjectInfo {
  list: Project[],
  projectIndex: number | null
}
