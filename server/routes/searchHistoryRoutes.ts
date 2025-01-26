import { Router } from 'express'
import Handler from '../controllers/searchHistoryController'

const router = Router()


router.get('/', Handler.getHistory)

router.post('/', Handler.saveHistory)

router.delete('/:query', Handler.remove)

export default router
