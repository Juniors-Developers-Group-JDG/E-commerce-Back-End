import { Schema, model } from 'mongoose'
import { IUser } from '../types/user'

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  purchaseHistory: [
    {
      purchaseDate: { type: Date },
      item: [
        {
          productId: { type: String },
          productName: { type: String },
          quantity: { type: Number },
          price: { type: Number },
        },
      ],
      totalAmount: { type: Number },
    },
  ],
  profilePhoto: { type: String },
  created_at: { type: Date, default: Date.now },
})

export default model('User', UserSchema)
