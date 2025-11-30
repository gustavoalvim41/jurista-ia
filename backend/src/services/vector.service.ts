import { CohereClientV2 } from "cohere-ai";
import { chroma } from "../../src/server";
import { COLLECTION_NAME } from "../constants";

const client = new CohereClientV2({
  token: process.env.API_KEY!,
});

export default class VectorService {
  static async storeEmbeddings(
    ids: string[],
    embeddings?: number[][],
    documents?: string[],
    filename?: string
  ): Promise<void> {
    try {
      const collection = await chroma.getOrCreateCollection({
        name: COLLECTION_NAME,
      });
      const metadatas = ids.map((_, i) => ({ filename, chunk: i }));
      await collection.upsert({ ids, embeddings, documents, metadatas });
      console.log("embeddings armazenadas com sucesso.");
    } catch (err) {
      console.error("erro ao armazenar embeddings:", err);
    }
  }
  static async getEmbeddings() {
    try {
      const collection = await chroma.getOrCreateCollection({
        name: COLLECTION_NAME,
      });
      return await collection.get({
        limit: 30,
        include: ["embeddings", "documents", "metadatas", "uris"],
      });
    } catch (err) {
      console.error("erro ao buscar embeddings:", err);
      return null;
    }
  }
  static async searchContext(question: string): Promise<string[]> {
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
