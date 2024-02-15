import express from "express";
import helmet from "helmet";
import cors from "cors";
import { MongoConn } from "./services/MongoConnect";
import errorHandler from "./middleware/exceptions";
import { PostService } from "./services/PostService";
import { PostController } from "./controller/PostController";
import createRouter from "./routes/routes";

//Dotenv
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || "127.0.0.1";

//Main function...
async function run() {
  //Express config
  const app = express();
  app.use(express.json());
  app.use(helmet());
  app.use(cors());

  //DB connection
  try {
    await MongoConn.connectDB();
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection to MongoDB failed.", error);
    await MongoConn.connectDB().finally()
    process.exit(1); //Exiting now
  }
  app.listen(PORT, () => {
    console.log(`Express is running on port http://${HOST}:${PORT}.`);
  });

  //Middleware
  app.use(errorHandler);
}
run();
