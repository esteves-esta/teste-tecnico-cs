import LocalStorageHandler from "@/shared/utils/LocalStorageHandler";
import constants from "@/shared/utils/constants";

export default class SearchHandler {
  static saveHistory(query: string) {
    try {
      const list = LocalStorageHandler.getItem(constants.SEARCH_LOCAL_STORAGE_KEY) || []
      if (list.includes(query)) return;

      if (list.length >= 5) {
        list.pop()
      }
      LocalStorageHandler.setItem(constants.SEARCH_LOCAL_STORAGE_KEY,
        [query, ...list]
      )
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }

  }
  static getHistory(): string[] {
    try {
      return LocalStorageHandler.getItem(constants.SEARCH_LOCAL_STORAGE_KEY) || []

    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }

  }
  static remove(query: string) {
    try {
      const list: string[] = LocalStorageHandler.getItem(constants.SEARCH_LOCAL_STORAGE_KEY) || []
      if (!list.includes(query)) return;


      LocalStorageHandler.setItem(constants.SEARCH_LOCAL_STORAGE_KEY,
        [...list.filter(item => item != query)]
      )
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }

  }
}
