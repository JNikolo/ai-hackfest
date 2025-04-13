import { Router } from "express";
import { connectToDatabase } from "../db";
import { ObjectId } from "mongodb";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const newUser = req.body;
    const result = await db.collection("users").insertOne(newUser);
    res.status(201).json(result); // Return the created user
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
