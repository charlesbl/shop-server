import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ProductsModule,
        AuthModule,
        UsersModule
    ],
    controllers: [],
    providers: []
})
export class AppModule { }
