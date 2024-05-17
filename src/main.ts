import express from "express";
import cors from "cors";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import { MongoConn } from "./services/MongoConnect";
import errorHandler from "./middleware/exceptions";
import { appRouter } from "./routes/router";
import favicon from "serve-favicon";
import dotenv from "dotenv";

// Dotenv load
dotenv.config();

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || "127.0.0.1";

async function connectToDatabase() {
  try {
    await MongoConn.connectDB();
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection to MongoDB failed.", error);
    process.exit(1); // Exit if connection fails
  }
}

function configureExpressApp() {
  const app = express();
  
  // Express middleware configuration
  app.use(express.json());
  app.use(cors());
  app.use(express.static("public"));
  app.use(favicon(path.join(__dirname, "../public/favicon.ico")));

  // EJS template engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("layout", "./layouts/layout");
  app.set("view engine", "ejs");
  app.use(expressLayouts);

  // Error handling middleware for EJS
  app.use(errorHandler);

  // Routing
  const ejsRouter = appRouter();
  app.use("/", ejsRouter);
  
  return app;
}

async function startBackend() {
  await connectToDatabase();

  const app = configureExpressApp();

  //IF everything works, start the server
  app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}.`);
  });
}

// Main entry point
startBackend().catch((error) => {
  console.error("Error starting server:", error);
  console.error("Did you configure the .env file?"); 
});
