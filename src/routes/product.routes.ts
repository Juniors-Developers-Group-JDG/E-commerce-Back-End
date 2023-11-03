import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { upload } from '../middleware/uploadImage'

const productRouter = Router()

const productController = new ProductController()

productRouter.get('/', productController.findAll)
productRouter.post(
  '/images/:productId',
  upload.array('image'),
  productController.uploadImages,
)
productRouter.get('/:id', productController.findById)
productRouter.delete('/:id', productController.delete)
productRouter.post('/create/', productController.create)
productRouter.patch('/edit/:id', productController.edit)

export { productRouter }
