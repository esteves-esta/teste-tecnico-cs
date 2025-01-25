import { NextFunction, Response, Request } from 'express';
import searchDB from '../config/searchHistoryDB'

export default class SearchHandler {
  static async saveHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req.body

      const db = await searchDB()
      const history = await db.data;

      if (!history.includes(query)) return;

      if (history.length >= 5) {
        history.pop()
      }

      db.data.push(query)
      db.write()
      await res.status(200);

      next();
    } catch (error) {
      console.error(`Error on saving search history: ${error}`)
      throw error;
    }

  }
  static async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const db = await searchDB()
      const history = await db.data;

      await res.status(200).send({ history });

      next();

    } catch (error) {
      // console.error(`Error on getting search history: ${error}`)
      throw error;
    }

  }
  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req.body

      const db = await searchDB()
      const history = await db.data;

      if (!history.includes(query)) return;

      await db.data.filter(item => item != query)
      db.write()
      await res.status(200);

      next();
    } catch (error) {
      console.error(`Error on removing item from search history: ${error}`)
      throw error;
    }

  }
}
