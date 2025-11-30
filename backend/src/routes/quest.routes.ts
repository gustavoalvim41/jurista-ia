import { Router } from 'express';
import QuestController from '../controllers/question.controller';

const router = Router();

router.post('/quest', QuestController.question);

export default router;
