import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module'
import { UsersService } from '../users/users.service'
import { LocalStrategy } from './local.strategy'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2d' }
        })
    ],
    providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
