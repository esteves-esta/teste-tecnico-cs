import { Router } from 'express'
import Handler from '../controllers/searchHistoryController'

const router = Router()


router.get('/', Handler.getHistory)

// router.post('/', Handler)

// router.delete('/:slug', Handler)

export default router
