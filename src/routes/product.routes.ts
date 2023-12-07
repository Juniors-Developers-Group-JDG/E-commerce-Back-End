import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { upload } from '../middleware/uploadImage'
import { authMiddleware } from '../middleware/auth.middleware'

const productRouter = Router()

const productController = new ProductController()

productRouter.get('/', authMiddleware, productController.findAll)
productRouter.post(
  '/images/:productId',
  upload.array('image'),
  authMiddleware,
  productController.uploadImages,
)
productRouter.get('/:id', authMiddleware, productController.findById)
productRouter.delete('/:id', authMiddleware, productController.delete)
productRouter.post('/create/', authMiddleware, productController.create)
productRouter.patch('/edit/:id', authMiddleware, productController.edit)

// Nova rota para buscar um produto com avaliações usando populate
productRouter.get(
  '/with-reviews/:productId',
  authMiddleware,
  productController.findByProductAndPopulate,
)

export { productRouter }
