export default class ChunkService {
  static textToChunks(text: string, maxLen = 800, overlap = 150): string[] {
    const sentences = text.replace(/\n+/g, " ").split(/(?<=[.!?])\s+/);
    const chunks: string[] = [];
    let currentChunk = "";
    for (const sentence of sentences) {
      if ((currentChunk + " " + sentence).trim().length > maxLen) {
        if (currentChunk) chunks.push(currentChunk.trim());
        if (overlap > 0) {
          const start = Math.max(currentChunk.length - overlap, 0);
          currentChunk = currentChunk.slice(start).trim() + " " + sentence;
        } else {
          currentChunk = sentence;
        }
      } else {
        currentChunk += " " + sentence;
      }
    }
    if (currentChunk.trim().length > 0) chunks.push(currentChunk.trim());
    return chunks;
  }
}
