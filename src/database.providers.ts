import * as mongoose from 'mongoose'
import dotenv from 'dotenv'

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> => {
            dotenv.config()
            if (process.env.DB_URI == null) {
                throw new Error('DB_URI not defined')
            }
            return await mongoose.connect(process.env.DB_URI)
        }
    }
]
