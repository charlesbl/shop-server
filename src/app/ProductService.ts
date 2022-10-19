import { Injectable } from "@nestjs/common";
import { IProduct, RestProduct, ProductModel } from "../models/ProductModel";

export interface CreateProduct {
    name: string,
    desc: string,
    price: string
}

const productDocumentToRestObject = (product: IProduct): RestProduct => {
    return {
        id: product.id,
        desc: product.desc,
        name: product.name,
        price: product.price
    };
}

@Injectable()
export class ProductService {
    async getProduct(id: string): Promise<RestProduct> {
        const product = await ProductModel.findById(id)
        return productDocumentToRestObject(product)
    }
    async getAllProduct(): Promise<RestProduct[]> {
        return await (await ProductModel.find()).map((product) => productDocumentToRestObject(product));
    }

    async createProduct(createProduct: CreateProduct): Promise<RestProduct | undefined> {
        const product = await ProductModel.create(createProduct)
        if (product.id != null) {
            return productDocumentToRestObject(product)
        } else {
            return undefined
        }
    }

    async editProduct(id: string, createProduct: CreateProduct): Promise<RestProduct> {
        const product = await ProductModel.findOneAndUpdate({ id }, createProduct, { new: true });
        return productDocumentToRestObject(product)
    }

    async deleteProduct(id: string): Promise<RestProduct> {
        const product = await ProductModel.findByIdAndRemove(id);
        return productDocumentToRestObject(product)
    }
}