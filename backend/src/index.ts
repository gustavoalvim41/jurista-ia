import { Router } from 'express';
import ingestRoutes from './routes/ingest.routes';
import questionRoutes from './routes/quest.routes';

const router = Router();

router.use('/ingest', ingestRoutes);
router.use('/question', questionRoutes);

export default router;
