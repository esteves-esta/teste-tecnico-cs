import express from 'express'
import projectsRoutes from '../routes/projectsRoutes'
import searchHistoryRoutes from '../routes/searchHistoryRoutes'
import serverless from "serverless-http";

const api = express()
const PORT = process.env.PORT || 3000
console.log(process.env.NODE_ENV)

// middleware to parse json
api.use(express.json({ limit: '100mb' }))
api.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

api.use('/api/project', projectsRoutes)

api.use('/api/searchHistory', searchHistoryRoutes)

api.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

api.get('/', (req, res) => {
  res.send('Hello, Express!')
})

export default api

export const handler = serverless(api);
