import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.DB_NAME || "mydatabase";

let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) return db;

  const client = new MongoClient(uri);
  await client.connect();

  db = client.db(dbName);
  console.log("✅ Connected to MongoDB Atlas");
  return db;
};
