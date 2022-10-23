import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { envConstants } from '../env.constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor () {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: envConstants().JWT_SECRET
        })
    }

    public async validate (payload: any): Promise<any> {
        return { userId: payload.sub, username: payload.username }
    }
}
