import DB from "./database";
import dotenv from "dotenv"
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/AppModule";

dotenv.config()

DB.connect().then(async () => {
    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(3001);


    const handleShutdownGracefully = () => {
        console.info("closing server gracefully...");
        app.close()
        console.info("server closed.");
        DB.disconnect();
        process.exit(0);
    }
    process.on("SIGINT", handleShutdownGracefully);
    process.on("SIGTERM", handleShutdownGracefully);
    process.on("SIGHUP", handleShutdownGracefully);

});
