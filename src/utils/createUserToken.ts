import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const createUserToken = async (user, request, response) => {
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    `${process.env.SECRET}`,
  )

  response.status(200).json({
    message: 'Você está autenticado',
    userId: user._id,
    token,
  })
}

export { createUserToken }
