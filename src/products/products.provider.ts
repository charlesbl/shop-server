import { Connection } from 'mongoose'
import { ProductSchema } from './products.model'

export const productsProviders = [
    {
        provide: 'PRODUCTS_MODEL',
        useFactory: (connection: Connection) => connection.model('product', ProductSchema),
        inject: ['DATABASE_CONNECTION']
    }
]
