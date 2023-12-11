import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
// import { upload } from '../middleware/uploadImage'

const userRouter = Router()

const userController = new UserController()

userRouter.post('/register/', userController.register)
userRouter.post('/login/', userController.login)
userRouter.post('/send-mail-password', userController.forgotPassword)
userRouter.patch('/recover-password/:id', userController.changePassword)

export { userRouter }
