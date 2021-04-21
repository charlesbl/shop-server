import express from "express";
import { v4 as uuid } from 'uuid';
import Product from "./shared/product";

const productList: Product[] = [];
productList.push(new Product("Produit A", "5126"));
productList.push(new Product("Product B", "3215"));
productList.push(new Product("Eau evian", "985"));
productList.push(new Product("produit test", "21585"));

const port = 8080;
const app = express();

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/products", (req, res) => {
    res.json(productList);
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

