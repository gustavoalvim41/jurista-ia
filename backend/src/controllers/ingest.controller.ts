import { Request, Response } from 'express';
import IngestService from '../services/ingest.service';

export default class IngestController {
  static async upload(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'File not sent' });
      }
      const allowedMimeTypes = ['text/plain', 'application/pdf'];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: 'Only .txt or .pdf files are allowed' });
      }
      const result = await IngestService.process(req.file);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
