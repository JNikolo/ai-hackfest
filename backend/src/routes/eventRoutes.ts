import { Router } from "express";
import { connectToDatabase } from "../db";
import { ObjectId } from "mongodb";

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
    const result = await db.collection("events").insertOne(newEvent);
    res.status(201).json(result); // Return the created event
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
