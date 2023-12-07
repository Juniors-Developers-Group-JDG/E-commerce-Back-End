import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import bcrypt from 'bcrypt'
import { UserValidation } from '../validations/user.validation'
import * as Yup from 'yup'

const userService = new UserService()

class UserController {
  async register(request: Request, response: Response) {
    const userData = request.body

    try {
      await UserValidation.validate(userData, { abortEarly: false })
    } catch (error) {
      const yupError = error as Yup.ValidationError
      const allErrors = {}

      yupError.inner.forEach((error) => {
        allErrors[error.path] = error.message
      })

      return response.status(404).send({
        error: allErrors,
      })
    }

    // check if user exists
    if (await userService.findOne({ email: userData.email }))
      return response.status(422).json({ message: 'E-mail já cadastrado!' })

    // Create a encrypted password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(userData.password, salt)

    try {
      const newUser = await userService.register({
        name: userData.name,
        email: userData.email,
        password: passwordHash,
        purchaseHistory: [],
        profilePhoto: userData.profilePhoto,
        created_at: new Date(),
      })

      newUser.password = undefined

      response
        .status(201)
        .json({ message: 'Usuário Criado com sucesso', newUser })
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error!',
        message: error,
      })
    }
  }
}

export { UserController }
