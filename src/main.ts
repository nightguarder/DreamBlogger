import express from "express";
import cors from "cors";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import { MongoConn } from "./services/MongoConnect";
import errorHandler from "./middleware/exceptions";
import { appRouter } from "./routes/router";

//Dotenv
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || "127.0.0.1";
//Main.ts
async function run() {
  //DB connection
  try {
    await MongoConn.connectDB();
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection to MongoDB failed.", error);
    await MongoConn.connectDB().finally();
    process.exit(1); //Exiting now
  }
}
run()
  .then(() => {
    //Connection to MongoDB was successful
    const app = express();
    //Express config
    app.use(express.json());
    app.use(cors());

    app.use(express.static("public"));

    //Ejs Template engine
    app.set("views", path.join(__dirname, "views"));
    app.set("layout", "./layouts/layout"); //Set Default page
    app.set("view engine", "ejs");
    app.use(expressLayouts);

    const ejsRouter = appRouter();
    app.use("/", ejsRouter);

    //Middleware
    app.use(errorHandler);
    app.use((req, res) => {
      res.status(404);
      res.send("404");
    });
    //Console
    console.log("Server running on port " + PORT);
    app.listen(PORT, () => {
      console.log(`Express is running on port http://${HOST}:${PORT}.`);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
