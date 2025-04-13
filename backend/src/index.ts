import express from "express";
import { connectToDatabase } from "./db";
import { userRouter } from "./routes/userRoutes";
import { eventRouter } from "./routes/eventRoutes";
import { eventRegistrationRouter } from "./routes/eventRegistrationRoutes";

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/api/users", userRouter); // Use the user router for all /api/users routes
app.use("/api/events", eventRouter); // Use the event router for all /api/events routes
app.use("/api/event-registrations", eventRegistrationRouter); // Use the event registration router for all /api/event-registrations routes

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
