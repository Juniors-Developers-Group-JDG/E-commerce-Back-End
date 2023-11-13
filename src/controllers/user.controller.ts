import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import bcrypt from 'bcrypt'

const userService = new UserService()

class UserController {
  async register(request: Request, response: Response) {
    const userData = request.body

    if (!userData.name)
      return response.status(422).json({ message: 'O nome é obrigatório!' })
    if (!userData.email)
      return response.status(422).json({ message: 'O email é obrigatório!' })
    if (!userData.password)
      return response.status(422).json({ message: 'A senha é obrigatória!' })
    if (userData.password !== userData.confirmPassword)
      return response.status(422).json({ message: 'As senhas não conferem!' })

    // check if user exists
    if (await userService.findOne({ email: userData.email }))
      return response
        .status(422)
        .json({ message: 'Por favor, utilize outro e-mail!' })

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
