import { Document, Model, model, Schema } from "mongoose";

const ProductSchema: Schema = new Schema({
    name: {type: String, required: true},
    price: {type: String, required: true}
});

export interface IProduct extends Document {
    name: string;
    price: string;
    description: string;
}

export const ProductModel: Model<IProduct> = model('Product', ProductSchema);