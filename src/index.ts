import express from "express";
import { connect } from "./database";
import { IProduct, ProductModel } from "./models/ProductModel";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
})

const app = express();
app.use(cors());

connect();

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/products", async (req, res) => {
    let products: Array<IProduct> = await ProductModel.find();
    res.json(products.map((pdoc) => {
        return {
            id: pdoc._id,
            name: pdoc.name,
            price: pdoc.price
        };
    }));
});

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});

