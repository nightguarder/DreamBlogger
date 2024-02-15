import express from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import { MongoConn } from "./services/MongoConnect";
import errorHandler from "./middleware/exceptions";
import {appRouter} from "./routes/routes";

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
    await MongoConn.connectDB().finally()
    process.exit(1); //Exiting now
  }

}
run()
    .then(() => {
        //Connection to MongoDB was successful
        const app = express();
        //Express config
        app.use(express.json());
        app.use(helmet());
        app.use(cors());
        app.use('/server', (req, res ) => {
            res.send("Server running...");
        });
        //Ejs
        app.use(expressLayouts);
        app.set('views', path.join(__dirname, 'views'));
        app.set('layout', './layouts/layout');
        app.set('view engine', 'ejs');
        //Routing
        app.use(express.static('public'));
        const ejsRouter = appRouter()
        app.use("",ejsRouter)

        //Middleware
        app.use(errorHandler);

        //Console
      console.log("Server running on port " + PORT);
      app.listen(PORT, () => {
            console.log(`Express is running on port http://${HOST}:${PORT}.`);
        });
    })
    .catch((error) => {
      console.error('Error:', error);
    });