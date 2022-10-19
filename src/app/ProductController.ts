import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { RestProduct } from "../models/ProductModel";
import { CreateProduct, ProductService } from "./ProductService";

@Controller("/product")
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Put("/")
    async create(@Body() createProduct: CreateProduct): Promise<RestProduct> {
        return await this.productService.createProduct(createProduct);
    }

    @Get("/:id")
    async get(@Param('id') id: string): Promise<RestProduct> {
        return await this.productService.getProduct(id)
    }

    @Delete("/:id")
    async delete(@Param('id') id: string): Promise<RestProduct> {
        return await this.productService.deleteProduct(id)
    }

    @Get("/all")
    async all(): Promise<RestProduct[]> {
        return await this.productService.getAllProduct();
    }
}