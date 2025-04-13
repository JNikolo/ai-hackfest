import express from "express";
import { connectToDatabase } from "./db";

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/", async (req, res) => {
  const db = await connectToDatabase();
  const users = await db.collection("users").find().toArray();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const db = await connectToDatabase();
  const newUser = req.body; // Assuming the user data is sent in the request body
  await db.collection("users").insertOne(newUser);
  res.status(201).json(newUser);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
