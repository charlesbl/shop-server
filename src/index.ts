
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.modules'

const start = async (): Promise<void> => {
    const app = await NestFactory.create(AppModule, { cors: true })
    await app.listen(3001)

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
