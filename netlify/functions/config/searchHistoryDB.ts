// https://github.com/typicode/lowdb
import { JSONFilePreset } from 'lowdb/node'

export default async () => {
  const defaultData: string[] = []
  const db = await JSONFilePreset<string[]>('./db/searchHistoryDB.json', defaultData)
  return db
}

