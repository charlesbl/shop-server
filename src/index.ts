import { Connection } from "mongoose";
import DB from "./database";
import httpServerInit from "./httpServer";
import dotenv from "dotenv"

dotenv.config()

DB.connect().then(() => {
    const httpServer = httpServerInit();


    const handleShutdownGracefully = () => {
        console.info("closing server gracefully...");
        httpServer.close(() => {
            console.info("server closed.");
            DB.disconnect();
            process.exit(0);
        });
    }
    process.on("SIGINT", handleShutdownGracefully);
    process.on("SIGTERM", handleShutdownGracefully);
    process.on("SIGHUP", handleShutdownGracefully);

});
