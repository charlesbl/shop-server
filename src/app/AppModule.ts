import { Module } from '@nestjs/common';
import { ProductController } from './ProductController';
import { ProductService } from './ProductService';

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService],
})
export class AppModule { }