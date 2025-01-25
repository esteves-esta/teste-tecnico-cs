import { NextFunction, Response, Request } from 'express';
import searchDB from '../config/searchHistoryDB'

export default class SearchHandler {
  static async saveHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req.body
      const db = await searchDB()
      const history = await db.data;

      if (history.length >= 5) {
        history.pop()
      }

      db.data.push(query)

      await db.write()
      await res.status(200).send('Saved');

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

      await res.status(201).send({ history });

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

      if (!history.includes(query)) await res.status(201);

      db.data = db.data.filter(item => item != query)
      await db.write()
      await res.status(200).send('Removed');

      next();
    } catch (error) {
      console.error(`Error on removing item from search history: ${error}`)
      throw error;
    }

  }
}
