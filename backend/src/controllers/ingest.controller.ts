import { Request, Response } from 'express';
import IngestService from '../services/ingest.service';

export default class IngestController {
  static async upload(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'arquivo não enviado' });
      }
      const allowedMimeTypes = ['text/plain', 'application/pdf'];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: 'somente arquivos .txt ou .pdf são permitidos' });
      }
      const result = await IngestService.processFile(req.file);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error instanceof Error && error.name === 'MulterError') {
        console.error('erro no Multer:', error);
        return res.status(400).json({ error: error.message });
      }
      console.error('erro no endpoint upload:', error);
      return res.status(500).json({ error: error.message || 'erro interno ao processar seu arquivo.' });
    }
  }
}
