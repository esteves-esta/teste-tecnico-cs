import { Router } from 'express'
import Handler from '../controllers/projectsController'

const router = Router()

router.get('/:id', Handler.get)

router.get('/', Handler.list)

router.post('/', Handler.create)

router.put('/', Handler.edit)

router.put('/favorite/:id', Handler.toggleFavorite)

router.delete('/:id', Handler.remove)

export default router
