import { Router } from 'express'
import { ReviewController } from '../controllers/review.controller'

const reviewRouter = Router()

const reviewController = new ReviewController()

reviewRouter.post('/:productId/reviews', reviewController.create)

export { reviewRouter }
