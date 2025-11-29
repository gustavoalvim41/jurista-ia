import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

const client = new CohereClientV2({
  token: process.env.API_KEY!
});

export default class EmbeddingService {
  static async generateEmbedding(text: string): Promise<number[] | null> {
    if (!text || text.trim() === "") return null;
    try {
      const resp = await client.embed({
        model: "embed-v4.0",
        texts: [text],
        inputType: "search_document",
        embeddingTypes: ["float"]
      });
      if (
        resp.embeddings &&
        resp.embeddings.float &&
        Array.isArray(resp.embeddings.float[0])
      ) {
        return resp.embeddings.float[0] as number[];
      }
      console.error("Unexpected response from Cohere:", resp);
      return null;
    } catch (err) {
      console.error("Error when generating embedding:", err);
      return null;
    }
  }
}
