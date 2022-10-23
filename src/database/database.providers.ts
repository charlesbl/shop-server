import * as mongoose from 'mongoose'
import { envConstants } from '../env.constants'

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> => {
            return await mongoose.connect(envConstants().DB_URI)
        }
    }
]
