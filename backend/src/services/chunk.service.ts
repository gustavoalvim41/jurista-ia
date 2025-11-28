export default class ChunkService {
  static chunk(text: string, maxLen = 800, overlap = 150): string[] {
    const sentences = text
      .replace(/\n+/g, " ")
      .split(/(?<=[.!?])\s+/);

    const chunks: string[] = [];
    let currentChunk = "";

    for (const sentence of sentences) {
      if ((currentChunk + " " + sentence).trim().length > maxLen) {
        chunks.push(currentChunk.trim());
        const overlapText = currentChunk.slice(-overlap);
        currentChunk = overlapText + " " + sentence;
      } else {
        currentChunk += " " + sentence;
      }
    }
    
    if (currentChunk.length > 0) chunks.push(currentChunk.trim());

    return chunks;
  }
}
