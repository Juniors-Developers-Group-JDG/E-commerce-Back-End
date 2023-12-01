import { Request, Response } from 'express'
import { ReviewService } from '../services/review.service'

const reviewService = new ReviewService()

class ReviewController {
  async create(request: Request, response: Response) {
    try {
      const { productId } = request.params
      const reviewInfo = request.body

      const reviewNote = reviewInfo.rating

      if (!(reviewNote >= 0 && reviewNote <= 5)) {
        return response.status(500).send({
          message: 'A Avalição deve ser um número entre 0 e 5',
        })
      }

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
