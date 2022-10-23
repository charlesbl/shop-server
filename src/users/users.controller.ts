import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import * as bcrypt from 'bcrypt'

@Controller('users')
export class UsersController {
    public constructor (private readonly usersService: UsersService) { }

    @Post('/signup')
    public async addUser (@Body('password') userPassword: string, @Body('username') userName: string): Promise<any> {
        const saltOrRounds = 10
        const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds)
        const result = await this.usersService.insertUser(userName, hashedPassword)
        return {
            userId: result.id,
            userName: result.username
        }
    }
}
