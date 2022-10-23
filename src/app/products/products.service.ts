import { Injectable } from "@nestjs/common";
import { ProductDocument, ProductRest, ProductModel } from "./products.model";

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

    async createProduct(createProduct: CreateProduct): Promise<ProductRest> {
        const product = await ProductModel.create(createProduct)
        if (product.id != null) {
            return productDocumentToRestObject(product)
        } else {
            throw new Error("Can't create product")
        }
    }

    async editProduct(id: string, createProduct: CreateProduct): Promise<ProductRest> {
        const product = await ProductModel.findOneAndUpdate({ id }, createProduct, { new: true });
        if (product == null) {
            throw new Error(`Can't edit product id: "${id}"`)
        }
        return productDocumentToRestObject(product)
    }

    async deleteProduct(id: string): Promise<ProductRest> {
        const product = await ProductModel.findByIdAndRemove(id);
        return productDocumentToRestObject(product)
    }
}