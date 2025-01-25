import { Router } from 'express'
import Handler from '../controllers/projectsController'

const router = Router()


router.get('/', Handler.list)

router.post('/', Handler.create)

router.put('/favorite', Handler.toggleFavorite)

router.put('/', Handler.edit)

router.delete('/', Handler.remove)

export default router
