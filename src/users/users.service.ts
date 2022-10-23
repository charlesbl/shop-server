import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { User } from './users.model'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    public constructor (@Inject('USERS_MODEL') private readonly UserModel: Model<User>) { }

    public async insertUser (userName: string, password: string): Promise<User> {
        const saltOrRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltOrRounds)

        const username = userName.toLowerCase()
        const newUser = new this.UserModel({
            username,
            password: hashedPassword
        })
        await newUser.save()
        return newUser
    }

    public async getUser (userName: string): Promise<User | null> {
        const username = userName.toLowerCase()
        const user = await this.UserModel.findOne({ username })
        return user
    }
}
