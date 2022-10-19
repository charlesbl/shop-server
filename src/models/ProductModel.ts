import { Document, model, Schema } from "mongoose";

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: String, required: true }
});


export interface Product {
    name: string;
    desc: string;
    price: string;
}

export interface ProductDocument extends Document, Product { }

export interface ProductRest extends Product {
    id: string
}

export const ProductModel = model<ProductDocument>('Product', ProductSchema);