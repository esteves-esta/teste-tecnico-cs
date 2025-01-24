export default class LocalStorageHandler {
  static getItem(key: string) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error retrieving item from localStorage: ${error}`);
      throw error

    }
  }

  static setItem(key: string, value: unknown) {
    try {
      const item = JSON.stringify(value);
      localStorage.setItem(key, item);
    } catch (error) {
      console.error(`Error setting item in localStorage: ${error}`);
      throw error;
    }
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
