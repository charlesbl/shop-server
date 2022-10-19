import { Document, Model, model, Schema } from "mongoose";

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: String, required: true }
});

export interface IProduct extends Document {
    name: string;
    desc: string;
    price: string;
}

export const ProductModel = model<IProduct>('Product', ProductSchema);