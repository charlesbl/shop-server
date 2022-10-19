import { Injectable } from "@nestjs/common";
import { ProductDocument, ProductRest, ProductModel } from "../models/ProductModel";

export interface CreateProduct {
    id?: string
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

    async createProduct(createProduct: CreateProduct): Promise<ProductRest> {
        const product = await ProductModel.create(createProduct)
        if (product.id != null) {
            return productDocumentToRestObject(product)
        } else {
            throw new Error("Can't create product")
        }
    }

    async createOrEditProduct(createProduct: CreateProduct): Promise<ProductRest> {
        if (createProduct.id != null && createProduct.id.length > 0) {
            const product = await ProductModel.findOneAndUpdate({ id: createProduct.id }, createProduct, { new: true });
            if (product == null) {
                throw new Error(`Can't edit product id: "${createProduct.id}"`)
            }
            return productDocumentToRestObject(product)
        } else {
            return await this.createProduct(createProduct)
        }
    }

    async deleteProduct(id: string): Promise<ProductRest> {
        const product = await ProductModel.findByIdAndRemove(id);
        return productDocumentToRestObject(product)
    }
}