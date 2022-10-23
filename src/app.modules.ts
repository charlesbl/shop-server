import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        ProductsModule,
        AuthModule,
        UsersModule
    ],
    controllers: [],
    providers: []
})
export class AppModule { }
