export default class IngestService {
  static async process(file: Express.Multer.File) {
    return {
      message: "File received",
      filename: file.originalname,
      path: file.path
    };
  }
}
