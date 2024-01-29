import { MongoClient,ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://";

//Local DB connection instance
export class MongoConn {

  static async connectDB() {
    const client = new MongoClient(MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    try{
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment.")
    }
    finally {
      await client.close();
    }

    return client;
  }
}
