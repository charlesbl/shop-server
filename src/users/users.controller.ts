import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    public constructor (private readonly usersService: UsersService) { }

    @Post('/signup')
    public async addUser (@Body('password') userPassword: string, @Body('username') userName: string): Promise<any> {
        const result = await this.usersService.insertUser(userName, userPassword)
        return {
            userId: result.id,
            userName: result.username
        }
    }
}
