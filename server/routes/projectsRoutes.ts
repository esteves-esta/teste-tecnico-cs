import { Router } from 'express'
import Handler from '../controllers/projectsController'

const router = Router()


router.get('/', Handler.list)

router.get('/:id', Handler.list)

router.post('/', Handler.create)

router.put('/', Handler.edit)

router.put('/favorite/:id', Handler.toggleFavorite)

router.delete('/:id', Handler.remove)

export default router
