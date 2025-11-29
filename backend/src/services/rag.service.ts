import { PDFParse } from "pdf-parse";

export default class RagService {
  static async extractText(file: Express.Multer.File): Promise<string> {
    const ext = file.originalname.split(".").pop()?.toLowerCase();
    if (ext === "txt") {
      return file.buffer.toString("utf-8");
    }
    if (ext === "pdf") {
      const parser = new PDFParse({ data: file.buffer });
      try {
        const result = await parser.getText();
        return result.text;
      } finally {
        await parser.destroy();
      }
    }
    throw new Error("File type not supported");
  }
}
