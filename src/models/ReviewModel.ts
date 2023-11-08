import { Schema, model } from 'mongoose'
import { IReview } from '../types/review'

const ReviewSchema = new Schema<IReview>({
  rating: { type: Number, required: true },
  comment: { type: String, required: false },
  product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
})

export default model('Reviews', ReviewSchema)
