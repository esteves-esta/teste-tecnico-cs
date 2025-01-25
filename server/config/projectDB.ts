// https://github.com/typicode/lowdb
import { JSONFilePreset } from 'lowdb/node'
import { Project } from '../models/Project'

export default async () => {
  interface Data { projects: Project[] }
  const defaultData: Data = { projects: [] }
  const db = await JSONFilePreset<Data>('projectsDB.json', defaultData)
  return db
}

