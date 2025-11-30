import crypto from "crypto";

import RagService from "./rag.service";
import EmbeddingService from "./embedding.service";
import ChunkService from "./chunk.service";
import VectorService from "./vector.service";

export default class IngestService {
  static async processFile(file: Express.Multer.File) {
    const text = await RagService.extractText(file);
    const chunks = ChunkService.textToChunks(text);
    const uniqueChunks = Array.from(new Set(chunks));
    const embeddings = await Promise.all(
      uniqueChunks.map((chunk) => EmbeddingService.generateEmbedding(chunk))
    );
    const ids = uniqueChunks.map(chunk =>
      crypto.createHash("md5").update(chunk).digest("hex")
    );
    await VectorService.storeEmbeddings(ids, embeddings as number[][], uniqueChunks, file.originalname);
    const vector = await VectorService.getEmbeddings()
    return {
      message: "arquivo enviado",
      chunks: chunks.length,
      ids: vector.ids,
      metadata: vector.metadatas,
      embeddings: vector.embeddings,
    };
  }
}
