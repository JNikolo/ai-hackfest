import { MongoClient, Db } from "mongodb";
import { MONGODB_URI, DB_NAME } from "./config";

let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) return db;

  const client = new MongoClient(MONGODB_URI as string);
  await client.connect();

  db = client.db(DB_NAME as string);
  console.log("✅ Connected to MongoDB Atlas");
  return db;
};
