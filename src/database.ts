import Mongoose from "mongoose"

const dbUri = "mongodb+srv://shop-prod:RcsCMSldaj3CbwvC@c0.tqjgz.mongodb.net/shop?retryWrites=true&w=majority";
const dbOptions = {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

let database: Mongoose.Connection;

export function connect() {
    Mongoose.connect(dbUri, dbOptions);

    database = Mongoose.connection;

    database.once("open", async () => {
        console.log("Connected to database");
    });

    database.on("error", () => {
        console.log("Error connecting to database");
    });
  
}