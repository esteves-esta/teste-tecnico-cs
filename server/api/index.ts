import express from 'express'
import projectsRoutes from '../routes/projectsRoutes'
import searchHistoryRoutes from '../routes/searchHistoryRoutes'
import serverless from "serverless-http";

const api = express()
const PORT = process.env.PORT || 3000

api.use(express.json())
api.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const router = express.Router();
router.get("/hello", (req, res) => { res.send("Hello World!") });
router.get("/project", projectsRoutes);
router.get("/searchHistory", searchHistoryRoutes);

// api.use('/api/project', projectsRoutes)

// api.use('/api/searchHistory', searchHistoryRoutes)

api.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

api.use("/.netlify/functions/", router);

export default api

export const handler = serverless(api);
