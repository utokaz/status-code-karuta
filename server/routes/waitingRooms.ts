import express, { Request, Response } from 'express';
import { gameGroup } from '../index';

const router = express.Router();

router.get('/waitingRooms', async (_: Request, res: Response) => {
  res.send({ rooms: gameGroup });
});

export default router;
