import express from "express";
import { connect } from "./database";
import { IProduct, ProductModel } from "./models/ProductModel";

const port = 8080;
const app = express();

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

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

