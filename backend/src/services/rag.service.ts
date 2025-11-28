export default class RagService {
  static async extractText(file: Express.Multer.File): Promise<string> {
    const ext = file.originalname.split(".").pop()?.toLowerCase();

    if (ext === "txt") {
      return file.buffer.toString("utf-8");
    }

    if (ext === "pdf") {

    }

    throw new Error("File type not supported");
  }
}
