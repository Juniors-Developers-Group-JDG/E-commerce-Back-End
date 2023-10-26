import ProductModel from '../models/ProductModel'
import { IProduct } from '../types/product'

class ProductService {
  async create(productInfo: IProduct) {
    return await ProductModel.create(productInfo)
  }

  async findAll() {
    return await ProductModel.find()
  }

  async findByIdAndUpdate(productId: string, productUpdated: IProduct) {
    return await ProductModel.findByIdAndUpdate(productId, productUpdated, {
      new: true,
    })
  }
}

export { ProductService }
