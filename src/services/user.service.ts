import UserModel from '../models/UserModel'
import { IUser } from '../types/user'

class UserService {
  async register(userData: IUser) {
    const newUser = await UserModel.create(userData)
    return newUser
  }

  async findOne(query: object) {
    const ifExists = await UserModel.findOne(query)
    return ifExists
  }

  async updateUserFields(userId: string, fieldsToUpdate: Partial<IUser>) {
    return await UserModel.findByIdAndUpdate(userId, fieldsToUpdate, {
      new: true,
    })
  }
}

export { UserService }
