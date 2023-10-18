import { Schema, model } from 'mongoose'
import { IProduct } from '../types/product'

const UserSchema = new Schema<IProduct>(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
)

export default model('User', UserSchema)
