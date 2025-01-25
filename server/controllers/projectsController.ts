import { NextFunction, Response, Request } from 'express';
import type { DateValue } from "@internationalized/date";
import type { ProjectListRequest, sort_types } from "../models/ProjectList";
import type { Project } from "../models/Project";
import { formatToDate } from '../utils/DateFormat';
import projectDB from '../config/projectDB'

export default class ProjectHandler {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { project } = req.body
      if (!project) {
        res.status(400).json({ message: "Project required !" });
        next()
        return;
      }
      const db = await projectDB()
      db.data.projects.push(project)

      await db.write()
      await res.status(200).send('Saved');
      next();
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  static async edit(req: Request, res: Response, next: NextFunction) {
    try {

      const { project } = req.body
      if (!project) {
        res.status(400).json({ message: "Project required !" });
        next()
        return;
      }

      const db = await projectDB()
      const projectIndex = await ProjectHandler.getListAndProject(db.data.projects, project.id);
      if (projectIndex === -1) {
        await res.status(200).send('Project not found');
        next();
        return;
      }

      db.data.projects.splice(projectIndex, 1, { ...project })

      await db.write()
      await res.status(200).send('Updated');
      next();
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      if (!id) {
        res.status(400).json({ message: "Id required !" });
        next()
        return;
      }
      const db = await projectDB()
      const projectIndex = await ProjectHandler.getListAndProject(db.data.projects, id);
      if (projectIndex === -1) {
        await res.status(200).send('Project not found');
        next()
        return;
      }

      await res.status(200).send(db.data.projects[projectIndex]);
      next();
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ProjectListRequest = req.body
      if (!request) {
        await res.status(400).json({ message: "FavoriteOnly and sort are required fields !" });
        next();
        return;
      }

      const db = await projectDB()
      const list = db.data.projects;
      if (!list || list.length === 0) {
        await res.status(200).send([])
        next();
        return;
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
        formattedList = ProjectHandler.sortList(request.sort, formattedList)
      }

      await res.status(200).send({ projects: formattedList, total: list.length })
      next();
      return;
    } catch (error) {
      console.error(`Error on listing projects: ${error}`)

    }
  }

  static async toggleFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      if (!id) {
        res.status(400).json({ message: "Id required !" });
        next()
        return;
      }

      const db = await projectDB()
      const projectIndex = await ProjectHandler.getListAndProject(db.data.projects, id);
      if (projectIndex === -1) {
        await res.status(200).send('Project not found');
        next()
        return;
      }

      const project = db.data.projects[projectIndex];
      project.isFavorite = !project.isFavorite;
      db.data.projects.splice(projectIndex, 1, project)

      await db.write()
      await res.status(200).send('Favorited');
      next();
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      if (!id) {
        res.status(400).json({ message: "Id required !" });
        next()
        return;
      }

      const db = await projectDB()
      const projectIndex = await ProjectHandler.getListAndProject(db.data.projects, id);
      if (projectIndex === -1) {
        await res.status(200).send('Project not found');
        next()
        return;
      }

      db.data.projects.splice(projectIndex, 1)

      await db.write()
      await res.status(200).send('Deleted');
      next();
    } catch (error) {
      console.error(`Error: ${error}`)
      res.status(500).json({ error: `Error: ${error}` });
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
