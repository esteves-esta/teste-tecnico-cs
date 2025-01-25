// https://github.com/typicode/lowdb
import { JSONFilePreset } from 'lowdb/node'
import { Project } from '../models/Project'

export default async () => {
  const defaultData: Project[] = []
  const db = await JSONFilePreset<Project[]>('projectsDB.json', defaultData)
  return db
}

