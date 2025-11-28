import ChunkService from "./chunk.service";
import RagService from "./rag.service";

export default class IngestService {
  static async process(file: Express.Multer.File) {

    const text = await RagService.extractText(file);
    const chunks = ChunkService.chunk(text);
    
    return {
      message: "File received",
      filename: file.originalname,
      chunks,
      totalChunks: chunks.length,
    };
  }
}
