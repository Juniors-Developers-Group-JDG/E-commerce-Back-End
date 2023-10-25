import { Request, Response } from 'express'
import { ProductService } from '../services/product.service'
import { UserNotFoundError } from '../errors/userNotFoundError'
import { BadRequestError } from '../errors/badRequestError'

const productService = new ProductService()

class ProductController {
  async create(request: Request, response: Response) {
    try {
      const productInfo = request.body

      await productService.create(productInfo)

      return response.status(201).json()
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }

  async findAll(request: Request, response: Response) {
    try {
      const user = await productService.findAll()

      return response.json(user)
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }

  async findById(request: Request, response: Response) {
    try {
      const { id } = request.params
      const product = await productService.findById(id)
      return response.json(product)
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return response.status(404).send({
          message: error.message,
        })
      }
      if (error instanceof BadRequestError) {
        return response.status(400).send({
          message: error.message,
        })
      }
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }
}

export { ProductController }
