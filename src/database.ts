import Mongoose from "mongoose"

const dbOptions = {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

let database: Mongoose.Connection;

export function connect() {
    Mongoose.connect(process.env.DB_URI, dbOptions);

    database = Mongoose.connection;

    database.once("open", async () => {
        console.log("Connected to database");
    });

    database.on("error", () => {
        console.log("Error connecting to database");
    });

}