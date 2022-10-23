import * as mongoose from 'mongoose'

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> => {
            if (process.env.DB_URI == null) {
                throw new Error('DB_URI not set')
            }
            return await mongoose.connect(process.env.DB_URI)
        }
    }
]
