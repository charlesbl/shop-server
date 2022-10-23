import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './users.model'

@Injectable()
export class UsersService {
    public constructor (@InjectModel('user') private readonly UserModel: Model<User>) { }

    public async insertUser (userName: string, password: string): Promise<User> {
        const username = userName.toLowerCase()
        const newUser = new this.UserModel({
            username,
            password
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
