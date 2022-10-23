import dotenv from 'dotenv'

interface EnvVariables {
    JWT_SECRET: string
    DB_URI: string
}

export const envConstants = (): EnvVariables => {
    dotenv.config()

    if (process.env.JWT_SECRET == null || process.env.DB_URI == null) {
        throw new Error('Env not set')
    }

    return {
        JWT_SECRET: process.env.JWT_SECRET,
        DB_URI: process.env.DB_URI
    }
}
