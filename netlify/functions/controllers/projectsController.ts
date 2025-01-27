import type { DateValue } from "@internationalized/date";
import type { ProjectListRequest, sort_types } from "../models/ProjectList";
import type { Project } from "../models/Project";
import { formatToDate } from '../utils/DateFormat';
import projectDB from '../config/projectDB'

export default class ProjectHandler {
  static async create(project: Project) {
    try {

      if (!project) {
        return { body: "Project required !", status: 400 };
      }
      const db = await projectDB()
      db.data.projects.push(project)

      await db.write()
      return { body: "Saved", status: 200 };
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  static async edit(project: Project) {
    try {
      if (!project) {
        return { body: "Project required !", status: 400 };
      }

      const db = await projectDB()
      const projectIndex = await ProjectHandler.getListAndProject(db.data.projects, project.id);
      if (projectIndex === -1) {
        return { body: "Project not found", status: 200 };
      }

      db.data.projects.splice(projectIndex, 1, { ...project })

      await db.write()
      return { body: "Updated", status: 200 };
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  static async get(id: string) {
    try {
      if (!id) {
        return { body: "Id required", status: 400 };
      }
      const db = await projectDB()
      const projectIndex = await ProjectHandler.getListAndProject(db.data.projects, id);
      if (projectIndex === -1) {
        return { body: "Project not found", status: 200 };
      }
      return { body: db.data.projects[projectIndex], status: 200 };
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  static async list(request: ProjectListRequest) {
    try {
      if (!request) {
        return { body: "FavoriteOnly and sort are required fields !", status: 400 };
      }

      const db = await projectDB()
      const list = db.data.projects;
      if (!list || list.length === 0) {
        return { body: [], status: 200 };
      }

      let formattedList: Project[] = list
      if (request.favoritesOnly) {
        formattedList = formattedList.filter(item => item.isFavorite);
      }
      if (!!request.query) {
        const query = request.query as string;
        formattedList = formattedList.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
      }

      if (request.sort) {
        formattedList = ProjectHandler.sortList(request.sort as sort_types, formattedList)
      }

      return { body: { projects: formattedList, total: list.length }, status: 200 };
    } catch (error) {
      console.error(`Error on listing projects: ${error}`)
      throw error;
    }
  }

  static async toggleFavorite(id: string) {
    try {
      if (!id) {
        return { body: "Id required", status: 400 };
      }

      const db = await projectDB()
      const projectIndex = await ProjectHandler.getListAndProject(db.data.projects, id);
      if (projectIndex === -1) {
        return { body: "Project not found", status: 200 };
      }

      const project = db.data.projects[projectIndex];
      project.isFavorite = !project.isFavorite;
      db.data.projects.splice(projectIndex, 1, project)

      await db.write()
      return { body: "Favorited", status: 200 };
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  static async remove(id: string) {
    try {
      if (!id) {
        return { body: "Id required", status: 400 };
      }

      const db = await projectDB()
      const projectIndex = await ProjectHandler.getListAndProject(db.data.projects, id);
      if (projectIndex === -1) {
        return { body: "Project not found", status: 200 };
      }

      db.data.projects.splice(projectIndex, 1)

      await db.write()
      return { body: "Deleted", status: 200 };
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error
    }
  }

  private static getListAndProject(list: Project[], id: string): number {
    try {
      if (!list || list.length === 0) return -1;

      const itemIndex = list.findIndex(item => item.id === id);
      if (itemIndex < 0) return -1

      return itemIndex

    } catch (error) {
      console.error(`Error on getting projects: ${error}`)
      return -1
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
      return list.sort((a, b) => ProjectHandler.sortByDate(a, b, "date_end"));
    }
    if (sort === 'recent') {
      // Projetos iniciados mais recentemente.

      return list.sort((a, b) => ProjectHandler.sortByDate(a, b, "date_start"));
    }
    return list
  }

  private static sortByDate(a: Project, b: Project, prop_name: string) {
    const a_date = formatToDate(a[prop_name] as DateValue) as Date
    const b_date = formatToDate(b[prop_name] as DateValue) as Date
    return a_date.getTime() - b_date.getTime();
  }
}
