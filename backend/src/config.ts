import dotenv from "dotenv";

dotenv.config();

// Export the environment variables
export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const DB_NAME = process.env.DB_NAME;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
