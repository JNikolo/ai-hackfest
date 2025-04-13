import e, { Router, Request, Response } from "express";
import { connectToDatabase } from "../db";
import { ObjectId } from "mongodb"; // Import ObjectId for MongoDB ObjectId type

export const eventRegistrationRouter = Router();
interface EventRegistrationBody {
  eventId: string;
  userId: string;
  locationUser: [string, string]; // Assuming location is an array of strings (latitude and longitude)
}
eventRegistrationRouter.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const registrations = await db
      .collection("eventRegistrations")
      .find()
      .toArray();
    res.json(registrations);
  } catch (error) {
    console.error("Error fetching event registrations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

eventRegistrationRouter.post(
  "/",
  async (
    req: Request<{}, {}, EventRegistrationBody>,
    res: Response
  ): Promise<any> => {
    try {
      const db = await connectToDatabase();
      const newEvent = req.body; // Assuming you send eventId and userId in the request body
      const { eventId, userId, locationUser } = newEvent;
      // Check if the event exists
      const event = await db
        .collection("events")
        .findOne({ _id: new ObjectId(eventId) });
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      // Check if the user exists
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Register the user for the event
      const location = {
        type: "Point",
        coordinates: [parseFloat(locationUser[0]), parseFloat(locationUser[1])],
      };
      const result = await db
        .collection("eventRegistrations")
        .insertOne({ eventId, userId, location });

      res.status(201).json({
        message: "User registered for the event successfully",
        result,
      }); // Return the created registration
    } catch (error) {
      console.error("Error registering for event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

eventRegistrationRouter.post(
  "/nearby",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const db = await connectToDatabase();

      const { eventId, lat, lng, radius = "10000" } = req.body;

      // Validate inputs
      if (!eventId || !lat || !lng) {
        return res
          .status(400)
          .json({ error: "eventId, lat, and lng are required" });
      }

      if (!ObjectId.isValid(eventId as string)) {
        return res.status(400).json({ error: "Invalid eventId" });
      }

      const coordinates = [
        parseFloat(lng as string),
        parseFloat(lat as string),
      ];
      const maxDistance = parseFloat(radius as string); // in meters

      console.log("Coordinates:", coordinates);
      console.log("Max Distance:", maxDistance);
      console.log("Event ID:", eventId);
      console.log(
        await db
          .collection("eventRegistrations")
          .find({ eventId: eventId })
          .toArray()
      );

      const nearbyAttendees = await db
        .collection("eventRegistrations")
        .find({
          eventId: eventId,
          location: {
            $nearSphere: {
              $geometry: {
                type: "Point",
                coordinates,
              },
              $maxDistance: maxDistance,
            },
          },
        })
        .toArray();

      res.json(nearbyAttendees);
    } catch (error) {
      console.error("Error fetching nearby attendees:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
