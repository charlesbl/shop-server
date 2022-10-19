import { Injectable } from "@nestjs/common";
import { ProductDocument, ProductRest, ProductModel } from "../models/ProductModel";

export interface CreateProduct {
    name: string,
    desc: string,
    price: string
}

const productDocumentToRestObject = (product: ProductDocument): ProductRest => {
    return {
        id: product.id,
        desc: product.desc,
        name: product.name,
        price: product.price
    };
}

@Injectable()
export class ProductService {
    async getProduct(id: string): Promise<ProductRest> {
        const product = await ProductModel.findById(id)
        return productDocumentToRestObject(product)
    }
    async getAllProduct(): Promise<ProductRest[]> {
        return await (await ProductModel.find()).map((product) => productDocumentToRestObject(product));
    }

    async createProduct(createProduct: CreateProduct): Promise<ProductRest | undefined> {
        const product = await ProductModel.create(createProduct)
        if (product.id != null) {
            return productDocumentToRestObject(product)
        } else {
            return undefined
        }
    }

    async editProduct(id: string, createProduct: CreateProduct): Promise<ProductRest> {
        const product = await ProductModel.findOneAndUpdate({ id }, createProduct, { new: true });
        return productDocumentToRestObject(product)
    }

    async deleteProduct(id: string): Promise<ProductRest> {
        const product = await ProductModel.findByIdAndRemove(id);
        return productDocumentToRestObject(product)
    }
}