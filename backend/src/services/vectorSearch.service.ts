import { chroma } from "../server";
import { COLLECTION_NAME } from "../constants";
import { CohereClientV2 } from "cohere-ai";

const client = new CohereClientV2({
  token: process.env.API_KEY!,
});

export default class VectorSearchService {
  static async search(question: string): Promise<string[]> {
    try {
      const collection = await chroma.getOrCreateCollection({
        name: COLLECTION_NAME,
      });
      const resp = await client.embed({
        model: "embed-multilingual-v3.0",
        texts: [question],
        inputType: "search_query",
      });
      if (!resp.embeddings?.float?.[0]) {
        console.error("Embedding da query veio vazio:", resp);
        return [];
      }
      const embedding = resp.embeddings.float[0];
      const results = await collection.query({
        queryEmbeddings: [embedding],
        nResults: 5,
      });
      return results.documents?.[0] || [];
    } catch (err) {
      console.error("Erro no VectorSearchService:", err);
      return [];
    }
  }
}
