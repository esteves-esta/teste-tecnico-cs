import searchDB from '../config/searchHistoryDB'

export default class SearchHandler {
  static async saveHistory(query: string) {
    try {

      const db = await searchDB()
      const history = await db.data;

      if (history.length >= 5) {
        history.pop()
      }

      db.data.push(query)

      await db.write()

      return { body: 'Saved', status: 200 };
    } catch (error) {
      console.error(`Error on saving search history: ${error}`)
      throw error;
    }

  }
  static async getHistory() {
    try {
      const db = await searchDB()
      const history = await db.data;

      return { body: { history }, status: 200 };


    } catch (error) {
      // console.error(`Error on getting search history: ${error}`)
      throw error;
    }

  }
  static async remove(query: string) {
    try {
      const db = await searchDB()
      const history = await db.data;

      if (!history.includes(query)) return { body: '', status: 201 };

      db.data = db.data.filter(item => item != query)
      await db.write()
      return { body: 'Removed', status: 200 };
    } catch (error) {
      console.error(`Error on removing item from search history: ${error}`)
      throw error;
    }

  }
}
