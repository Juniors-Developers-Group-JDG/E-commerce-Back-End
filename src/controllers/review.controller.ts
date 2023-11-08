import { Request, Response } from 'express'
import { ReviewService } from '../services/review.service'

const reviewService = new ReviewService()

class ReviewController {
  async create(request: Request, response: Response) {
    try {
      const { productId } = request.params
      const reviewInfo = request.body

      await reviewService.create(productId, reviewInfo)

      return response.status(201).json()
    } catch (error) {
      console.log(error)
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }
}

export { ReviewController }
