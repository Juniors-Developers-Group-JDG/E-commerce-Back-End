import mongoose from 'mongoose'
import { UserNotFoundError } from '../errors/userNotFoundError'
import ProductModel from '../models/ProductModel'
import { IProduct } from '../types/product'
import { BadRequestError } from '../errors/badRequestError'

class ProductService {
  async create(productInfo: IProduct) {
    return await ProductModel.create(productInfo)
  }

  async findAll() {
    return await ProductModel.find()
  }

  async findById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('Invalid id.')
    }
    const product = await ProductModel.findById(id)
    if (!product) {
      throw new UserNotFoundError()
    }
    return product
  }

  async delete(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('Invalid id.')
    }
    const product = await ProductModel.findByIdAndDelete(id)
    if (!product) {
      throw new UserNotFoundError()
    }
    return product
  }
}

export { ProductService }
