import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserService } from '../services/user.service'
import dotenv from 'dotenv'
dotenv.config()

interface IDecoded {
  email: string
  id: string
  iat: number
}

const userService = new UserService()

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ message: 'unauthorized' })
    }

    const parts = authorization.split(' ')

    if (parts.length !== 2) {
      return res.status(401).json({ message: 'prefix or token not found' })
    }

    const [prefix, token] = parts

    if (prefix !== 'Bearer') {
      return res.status(401).json({ message: 'prefix invalid' })
    }

    jwt.verify(token, `${process.env.JWT_SECRET}`, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: 'Token invalid!' })
      }
      const { id, email } = decoded as unknown as IDecoded

      const user = await userService.find({
        id,
        email,
      })

      if (!user) {
        return res.status(401).json({ message: 'Invalid token!' })
      }

      return next()
    })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export { authMiddleware }
