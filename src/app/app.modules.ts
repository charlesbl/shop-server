import { Module } from '@nestjs/common';
import { ProductController } from './products/products.controller';
import { ProductService } from './products/products.service';

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService],
})
export class AppModule { }