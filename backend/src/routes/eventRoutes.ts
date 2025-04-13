import { Router, Request, Response } from "express";
import { connectToDatabase } from "../db";
import { ObjectId } from "mongodb";
import { generateEmbedding } from "../utils/embeddings";

export const eventRouter = Router();

eventRouter.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const events = await db.collection("events").find().toArray();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

eventRouter.post("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const newEvent = req.body;
    const { title, description, date, location } = newEvent;
    const embedding = await generateEmbedding(`${title} ${description}`); // Generate embedding for the event description
    const result = await db
      .collection("events")
      .insertOne({ title, description, date, location, embedding });
    res.status(201).json(result); // Return the created event
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

eventRouter.post(
  "/semantic-search",
  async (req: Request, res: Response): Promise<any> => {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const embedding = await generateEmbedding(query);
    const db = await connectToDatabase();

    const results = await db
      .collection("events")
      .aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: embedding,
            numCandidates: 100,
            limit: 10,
          },
        },
      ])
      .toArray();

    res.json(results);
  }
);
