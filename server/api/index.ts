import express from 'express'
import dotenv from "dotenv";
// import projectsRoutes from '../routes/projectsRoutes'
import searchHistoryRoutes from '../routes/searchHistoryRoutes'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000
console.log(process.env.NODE_ENV)

// middleware to parse json
app.use(express.json())

// app.use('/project', projectsRoutes)

app.use('/searchHistory', searchHistoryRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

export default app
