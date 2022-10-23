import Mongoose from "mongoose"

const connect = async () => {
    const dbUri = process.env.DB_URI;
    console.log(`DB_URI: ${dbUri}`);
    if (!dbUri) {
        throw new Error("DB_URI not defined")
    }

    Mongoose.connection.once("open", async () => {
        console.log("Connected to database");
    });

    Mongoose.connection.on("error", () => {
        console.log("Error connecting to database");
    });
    await Mongoose.connect(process.env.DB_URI);
}

function disconnect() {
    Mongoose.connection.close();
    console.log("Disconnected to database");
}

const DB = {
    connect,
    disconnect
}
export default DB;