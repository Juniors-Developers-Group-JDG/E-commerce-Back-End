import { Request, Response } from 'express'
import { ProductService } from '../services/product.service'
import { config } from 'dotenv'
import { cloudinary } from '../storage/cloudinary'
import { v4 as uuid } from 'uuid'
import { IFile } from '../types/product'
import { UploadApiResponse } from 'cloudinary'
import { deleteAllFilesInDir } from '../utils'

config()

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

  async uploadImages(request: Request, response: Response) {
    try {
      const files = request.files as []

      const { productId } = request.params

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

        await deleteAllFilesInDir('./src/uploads')

        return response.send()
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
