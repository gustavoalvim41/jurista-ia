import { Router } from 'express';
import multer from 'multer';
import IngestController from '../controllers/ingest.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), IngestController.upload);

export default router;
