import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { ProductRest } from "../models/ProductModel";
import { CreateProduct, ProductService } from "./ProductService";

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get("all")
    async getAll(): Promise<ProductRest[]> {
        return await this.productService.getAllProduct();
    }

    @Put()
    async create(@Body() createProduct: CreateProduct): Promise<ProductRest> {
        return await this.productService.createOrEditProduct(createProduct);
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