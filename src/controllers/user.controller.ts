import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import bcrypt from 'bcrypt'

config()

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

  async login(request: Request, response: Response) {
    const { email, password } = request.body

    if (!email)
      return response.status(422).json({ message: 'O e-mail é obrigatório' })
    if (!password)
      return response.status(422).json({ message: 'A senha é obrigatória' })

    // check if user exists
    const user = await userService.findOne({ email })
    if (!user)
      return response
        .status(422)
        .json({ message: 'Não há usuário cadastrado com este e-mail' })

    // check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword)
      return response.status(422).json({ message: 'Senha incorreta' })

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      `${process.env.JWT_SECRET}`,
    )
    response.status(200).json({ token, userId: user._id })
  }

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body

    if (!email)
      return response.status(422).json({ message: 'O e-mail é obrigatório' })

    const user = await userService.findOne({ email })

    if (!user)
      return response
        .status(422)
        .json({ message: 'Não há usuário cadastrado com este e-mail' })

    response
      .status(200)
      .json({ message: 'Usuário encontrado', id: user._id, email: user.email })
  }

  async changePassword(request: Request, response: Response) {
    const id = request.params.id

    const user = await userService.findOne({ id })

    if (!user)
      return response.status(422).json({ message: 'Usuário não encontrado' })

    const { password } = request.body

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    try {
      const newUser = await userService.updateUserFields(id, {
        password: passwordHash,
      })

      response.json(newUser)
    } catch (error) {
      console.log(error)
    }
  }
}

export { UserController }
