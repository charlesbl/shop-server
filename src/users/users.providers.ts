import { Connection } from 'mongoose'
import { UserSchema } from './users.model'

export const usersProviders = [
    {
        provide: 'USERS_MODEL',
        useFactory: (connection: Connection) => connection.model('user', UserSchema),
        inject: ['DATABASE_CONNECTION']
    }
]
