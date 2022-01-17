import cors from "cors";
import express, { json } from "express";
import morgan from "morgan";
import productRouter from "./productRouter";

const httpServerInit = () => {
    const app = express();
    app.use(cors());
    app.use(json());
    app.use(morgan("tiny"));

    app.get("/", (req, res) => {
        res.redirect("http://localhost:3000");
    });

    app.use("/product", productRouter);

    const httpServer = app.listen(3001, () => {
        console.log("Server started at http://localhost:3001");
    });

    return httpServer;
}
export default httpServerInit;