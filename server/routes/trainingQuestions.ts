import express, { Response, Request } from 'express';
import { createQuestions } from '../utils/createQuestions';

const router = express.Router();
router.get('/trainingQuestions', async (_: Request, res: Response) => {
  const { questions, displayOrderQuestions } = createQuestions();
  res.send({ questions, displayOrderQuestions });
});

export default router;
