import { Document, Types } from 'mongoose'

export interface IReview extends Document {
  rating: number
  product: Types.ObjectId
  comment?: string
}
