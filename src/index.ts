
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.modules'

const start = async (): Promise<void> => {
    const app = await NestFactory.create(AppModule, { cors: true })
    if (process.env.PORT == null) {
        throw new Error('PORT env not set')
    }
    await app.listen(process.env.PORT)

    const handleShutdownGracefully = (): void => {
        console.info('closing server gracefully...')
        void app.close()
        console.info('server closed.')
        process.exit(0)
    }
    process.on('SIGINT', handleShutdownGracefully)
    process.on('SIGTERM', handleShutdownGracefully)
    process.on('SIGHUP', handleShutdownGracefully)
}
void start()
