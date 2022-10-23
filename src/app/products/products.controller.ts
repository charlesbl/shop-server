import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { ProductRest } from "./products.model";
import { CreateProduct, ProductService } from "./products.service";

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getAll(): Promise<ProductRest[]> {
        return await this.productService.getAllProduct();
    }

    @Post()
    async create(@Body() createProduct: CreateProduct): Promise<ProductRest> {
        return await this.productService.createProduct(createProduct);
    }

    @Get(":id")
    async get(@Param('id') id: string): Promise<ProductRest> {
        return await this.productService.getProduct(id)
    }

    @Delete(":id")
    async delete(@Param('id') id: string): Promise<ProductRest> {
        return await this.productService.deleteProduct(id)
    }
}