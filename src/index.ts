import express from "express";
import { v4 as uuid } from 'uuid';
import session from "express-session";

const port = 8080;

// Server
const app = express();

app.use(session({
    genid: () => uuid(),
    secret: 'd65f4h5d4fg',
    resave: false,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
    res.send("hello" + req.sessionID);
});

app.get("/register", (req, res) => {
    res.send(uuid());
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

