import express from "express";
import { connect } from "./database";
import { IProduct, ProductModel } from "./models/ProductModel";
import cors from "cors";

const app = express();
app.use(cors());

connect();

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/products", async (req, res) => {
    const products: IProduct[] = await ProductModel.find();
    res.json(products.map((pdoc) => {
        return {
            id: pdoc._id,
            name: pdoc.name,
            price: pdoc.price
        };
    }));
});

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});

