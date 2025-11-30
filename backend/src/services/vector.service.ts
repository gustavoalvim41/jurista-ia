import { chroma } from "../../src/server";
import { COLLECTION_NAME } from "../constants"

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
        limit: 100,
        include: ["embeddings", "documents", "metadatas", "uris"],
      });
    } catch (err) {
      console.error("erro ao buscar embeddings:", err);
      return null;
    }
  }
}
