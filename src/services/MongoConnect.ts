import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
//ensure we have access to .env and configured variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://<username>:<password>@dreamblog.rgmr5q5.mongodb.net/?retryWrites=true&w=majority&appName=DreamBlog";

//Local DB connection instance
export class MongoConn {
  static async connectDB() {
    const client = new MongoClient(MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      //console.log("Pinged your deployment.");
    } finally {
      await client.close();
    }

    return client;
  }
}
