import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'

const productRouter = Router()

const productController = new ProductController()

productRouter.post('/', productController.create)
productRouter.get('/', productController.findAll)
productRouter.get('/:id', productController.findById)
productRouter.delete('/:id', productController.delete)

export { productRouter }
