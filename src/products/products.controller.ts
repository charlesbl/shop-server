import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Product } from './products.model'
import { CreateProduct, ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
    public constructor (private readonly productService: ProductsService) { }

    @Get()
    public async getAll (): Promise<Product[]> {
        return await this.productService.getAllProduct()
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    public async create (@Body() createProduct: CreateProduct): Promise<Product> {
        return await this.productService.createProduct(createProduct)
    }

    @Get(':id')
    public async get (@Param('id') id: string): Promise<Product | null> {
        return await this.productService.getProduct(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    public async delete (@Param('id') id: string): Promise<Product | null> {
        return await this.productService.deleteProduct(id)
    }
}
