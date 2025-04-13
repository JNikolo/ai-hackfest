import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config";

export const generateEmbedding = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const response = await ai.models.embedContent({
    model: "gemini-embedding-exp-03-07",
    contents: text,
    config: {
      taskType: "SEMANTIC_SIMILARITY",
      outputDimensionality: 1536,
    },
  });

  if (response.embeddings) {
    console.log(response.embeddings[0].values?.length); // Log the first embedding
    return response.embeddings[0].values; // Return the first embedding
  } else {
    console.error("Embeddings are undefined.");
  }
  return null; // Return null if embeddings are undefined
};

generateEmbedding("What is the meaning of life?").catch((error) => {
  console.error("Error generating embedding:", error);
});
