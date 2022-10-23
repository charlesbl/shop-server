import { Document, Schema } from 'mongoose'

export const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: String, required: true }
}, { timestamps: true })

export interface Product extends Document {
    _id: string
    name: string
    desc: string
    price: string
}
