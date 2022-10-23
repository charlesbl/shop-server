import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Product } from './products.model'

export interface CreateProduct {
    name: string
    desc: string
    price: string
}

@Injectable()
export class ProductsService {
    public constructor (@Inject('PRODUCTS_MODEL') private readonly productsModel: Model<Product>) { }

    public async getProduct (id: string): Promise<Product | null> {
        return await this.productsModel.findById(id)
    }

    public async getAllProduct (): Promise<Product[]> {
        return await this.productsModel.find()
    }

    public async createProduct (createProduct: CreateProduct): Promise<Product> {
        return await this.productsModel.create(createProduct)
    }

    public async editProduct (id: string, createProduct: CreateProduct): Promise<Product> {
        const product = await this.productsModel.findOneAndUpdate({ id }, createProduct, { new: true })
        if (product == null) {
            throw new Error(`Can't edit product id: "${id}"`)
        }
        return product
    }

    public async deleteProduct (id: string): Promise<Product | null> {
        const product = await this.productsModel.findByIdAndRemove(id)
        if (product == null) {
            return null
        }
        return product
    }
}
