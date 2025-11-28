import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

const client = new CohereClientV2({
  token: process.env.API_KEY!
});

export default class EmbeddingService {
  static async embedding(text: string): Promise<number[] | null> {
    try {
      const resp = await client.embed({
        model: "embed-v4.0",
        texts: [text],
        inputType: "search_document",
        embeddingTypes: ["float"]
      });
      return resp.embeddings.float[0];
    } catch (err) {
      console.error("Error when generating embedding: ", err);
      return null;
    }
  }
}
