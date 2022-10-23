import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    public constructor (private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login (@Req() req: Request): Promise<any> {
        const accessToken = await this.authService.login(req.user)
        return { accessToken }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('secret')
    public async s (@Req() req: Request): Promise<any> {
        return 'secret word'
    }
}
