import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { upload } from '../middleware/uploadImage'

const productRouter = Router()

const productController = new ProductController()

productRouter.post('/', productController.create)
productRouter.get('/', productController.findAll)
productRouter.post(
  '/images/:productId',
  upload.array('image'),
  productController.uploadImages,
)

export { productRouter }
