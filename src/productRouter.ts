import express from "express";
import { Types } from "mongoose";
import { IProduct, ProductModel } from "./models/ProductModel";

const productRouter = express.Router();

const getProductFromBody = (body: any) => {
    return {
        name: body.name,
        desc: body.desc,
        price: body.price
    };
}

productRouter.get("/all", async (req, res) => {
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

productRouter.put("/", async (req, res) => {
    const product = await ProductModel.create(getProductFromBody(req.body));
    res.json(product);
});

productRouter.get("/:id", async (req, res) => {
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

productRouter.post("/:id", async (req, res) => {
    if (!req.params.id || !Types.ObjectId.isValid(req.params.id)) {
        res.sendStatus(404);
        return;
    }
    const p = await ProductModel.findOneAndUpdate({ id: req.params.id }, getProductFromBody(req.body), { new: true });
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

productRouter.delete("/:id", async (req, res) => {
    if (!req.params.id || !Types.ObjectId.isValid(req.params.id)) {
        res.sendStatus(404);
        return;
    }

    await ProductModel.findByIdAndRemove(req.params.id);
    res.json(req.params.id);
});
export default productRouter;
