import { Router } from 'express'
import { statusRouter } from './status.route'

const routes = Router()

routes.use('/api/status', statusRouter)

export { routes }
