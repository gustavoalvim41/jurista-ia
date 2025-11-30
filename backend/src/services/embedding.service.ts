import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

const client = new CohereClientV2({
  token: process.env.API_KEY!,
});

export default class EmbeddingService {
  static async generateEmbedding(text: string): Promise<number[] | null> {
    if (!text || text.trim() === "") return null;
    try {
      const resp = await client.embed({
        model: "embed-multilingual-v3.0",
        texts: [text],
        inputType: "search_document",
      });
      if (resp.embeddings?.float?.[0]) {
        return resp.embeddings.float[0];
      }
      console.error("Resposta inesperada de Cohere:", resp);
      return null;
    } catch (err) {
      console.error("erro ao gerar embedding:", err);
      return null;
    }
  }
}
