import express, { json } from "express";
import { connect, disconnect } from "./database";
import { IProduct, ProductModel } from "./models/ProductModel";
import cors from "cors";
import { Types } from "mongoose";

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

app.get("/product/:id", async (req, res) => {
    if (!req.params.id || !Types.ObjectId.isValid(req.params.id)) {
        res.sendStatus(404);
        return;
    }
    const p = await ProductModel.findById(req.params.id);
    if (!p) {
        res.sendStatus(404);
        return;
    }
    res.json({
        id: p._id,
        name: p.name,
        desc: p.desc,
        price: p.price
    });
});

app.post("/product/add", async (req, res) => {
    const product = await ProductModel.create(req.body);
    res.json(product);
});

app.delete("/product/remove/:id", async (req, res) => {
    if (req.params.id && Types.ObjectId.isValid(req.params.id)) {
        await ProductModel.findByIdAndRemove(req.params.id);
        res.json(req.params.id);
    } else {
        res.sendStatus(404);
    }
});

const httpServer = app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});

function handleShutdownGracefully() {
    console.info("closing server gracefully...");
    httpServer.close(() => {
        console.info("server closed.");
        disconnect();
        process.exit(0);
    });
}
process.on("SIGINT", handleShutdownGracefully);
process.on("SIGTERM", handleShutdownGracefully);
process.on("SIGHUP", handleShutdownGracefully);