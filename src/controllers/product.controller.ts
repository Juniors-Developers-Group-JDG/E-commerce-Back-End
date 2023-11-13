import { Request, Response } from 'express'
import { ProductService } from '../services/product.service'
import { UserNotFoundError } from '../errors/userNotFoundError'
import { BadRequestError } from '../errors/badRequestError'
import { config } from 'dotenv'
import { cloudinary } from '../storage/cloudinary'
import { v4 as uuid } from 'uuid'
import { IFile, IProduct } from '../types/product'
import { UploadApiResponse } from 'cloudinary'
import { deleteAllFilesInDir } from '../utils'

config()

const productService = new ProductService()

class ProductController {
  async create(request: Request, response: Response) {
    try {
      const productInfo = request.body

      const newProduct = await productService.create(productInfo)

      return response
        .status(201)
        .json({ message: 'Produto Criado com sucesso!', newProduct })
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

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params
      await productService.delete(id)
      return response.status(204).json()
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

  async edit(request: Request, response: Response) {
    const productId = request.params.id

    const productUpdate = request.body

    try {
      if (typeof productUpdate.amount !== 'number') {
        return response
          .status(400)
          .json({ error: 'A quantidade deve ser um número.' })
      }

      const product = await productService.findByIdAndUpdate(
        productId,
        productUpdate,
      )

      console.log(product)

      return response.json(product)
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }

  async uploadImages(request: Request, response: Response) {
    try {
      const files = request.files as []
      const { productId } = request.params
      const product = {} as IProduct

      try {
        const productResponse = await productService.findById(productId)
        Object.assign(product, productResponse._doc)
      } catch (error) {
        return response.status(400).json({
          message: 'product not found',
        })
      }

      if (files.length < 1) {
        return response.status(400).json({
          message: 'Please upload file',
        })
      }

      const imagesPromise = files.map((file: IFile) =>
        cloudinary.uploader.upload(`${file.path}`, {
          public_id: `${productId}_${uuid()}`,
          folder: 'e-commerce',
        }),
      )

      try {
        const responseUploadFiles: UploadApiResponse[] =
          await Promise.all(imagesPromise)

        const urlImages = responseUploadFiles.map((image) => image.secure_url)

        const productImages = [...product.images, ...urlImages]

        product.images = productImages

        productService.findByIdAndUpdate(product._id.toString(), product)

        await deleteAllFilesInDir('./src/uploads')

        return response.status(201).json({
          message: 'image uploaded successfully',
        })
      } catch (error) {
        return response.status(500).send({
          error: 'Failed to upload images',
          message: error,
        })
      }
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }
}

export { ProductController }
