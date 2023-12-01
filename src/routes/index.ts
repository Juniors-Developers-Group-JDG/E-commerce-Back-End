import { Router } from 'express'
import { statusRouter } from './status.routes'
import { productRouter } from './product.routes'
import { userRouter } from './user.routes'
import { reviewRouter } from './review.routes'

import swaggerUi from 'swagger-ui-express'

import swaggerDocs from '../swagger.json'

const routes = Router()

routes.use('/api/status', statusRouter)
routes.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
routes.use('/api/products', productRouter)
routes.use('/api/users', userRouter)
routes.use('/api/products', reviewRouter)

export { routes }
