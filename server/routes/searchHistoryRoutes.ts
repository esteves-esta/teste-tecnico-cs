import { Router } from 'express'
import Handler from '../controllers/searchHistoryController'

const router = Router()


router.get('/', Handler.getHistory)

router.post('/', Handler.saveHistory)

router.delete('/', Handler.remove)

export default router
