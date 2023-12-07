import mongoose from 'mongoose'
import { BadRequestError } from '../errors/badRequestError'
import ReviewModel from '../models/ReviewModel'
import { IReview } from '../types/review'
import { ProductService } from './product.service'

class ReviewService {
  async create(productId: string, reviewInfo: IReview) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new BadRequestError('Invalid id.')
    }
    const productService = new ProductService()

    const product = await productService.findById(productId)

    if (!product) {
      throw new BadRequestError('Invalid product id.')
    }

    const review = new ReviewModel({
      rating: reviewInfo.rating,
      comment: reviewInfo.comment,
      product: product._id,
    })
    await review.save()

    product.reviews.push(review._id)
    await product.save()
  }
}

export { ReviewService }
