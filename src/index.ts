import express, { json } from "express";
import { connect } from "./database";
import { IProduct, ProductModel } from "./models/ProductModel";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

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
            desc: pdoc.desc,
            price: pdoc.price
        };
    }));
});

app.post("/product/add", async (req, res) => {
    console.log(req.body);
    let product = await ProductModel.create(req.body);
    res.json(product);
});

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});

