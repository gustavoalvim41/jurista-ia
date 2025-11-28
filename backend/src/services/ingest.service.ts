import RagService from "./rag.service";
import EmbeddingService from "./embedding.service";
import ChunkService from "./chunk.service";

export default class IngestService {
  static async process(file: Express.Multer.File) {

    const text = await RagService.extractText(file);
    const chunks = ChunkService.chunk(text);

    const embeddings = [];
    for (const chunk of chunks) {
      const embedding = await EmbeddingService.embedding(chunk);
      embeddings.push(embedding);
    }
    
    return {
      message: "File received",
      filename: file.originalname,
      embeddings,
      totalChunks: chunks.length,
    };
  }
}
