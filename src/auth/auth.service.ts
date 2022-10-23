import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { User } from '../users/users.model'

@Injectable()
export class AuthService {
    public constructor (private readonly usersService: UsersService, private readonly jwtService: JwtService) { }
    public async validateUser (username: string, password: string): Promise<User | null> {
        const user = await this.usersService.getUser(username)
        if (user == null) return null
        const passwordValid = await bcrypt.compare(password, user.password)
        if (passwordValid) {
            return user
        }
        return null
    }

    public async login (user: any): Promise<any> {
        const payload = { username: user.username, sub: user._id }
        return this.jwtService.sign(payload)
    }
}
