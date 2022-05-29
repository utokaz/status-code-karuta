import express, { Response, Request } from 'express';
import { gameGroup } from '../index';
import { PlayingUser } from '../types';

const router = express.Router();

router.get(
  '/questions/:userId/:groupId',
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const groupId = req.params.groupId;
    if (userId === undefined || groupId === undefined) {
      res.statusCode = 400;
      const error = new Error();
      error.message = 'lack of parameters';
      res.send({ error });
      return;
    }
    const group = gameGroup.find((r) => r.roomId === groupId);
    const isValidUser = group?.participatedUsers
      .map((u) => u.userId)
      .includes(userId);

    if (group !== undefined && isValidUser) {
      if (group.participatedUsers.find((u) => u.userId === userId)) {
        res.send({
          questions: group.questions.questions,
          displayOrderQuestions: group.questions.displayOrderQuestions,
          playingUsers: group.participatedUsers.map((u) => {
            const user: PlayingUser = {
              userId: u.userId,
              userName: u.userName,
              iconType: u.iconType,
              getCardCount: 0,
              wrongHitCount: 0,
            };
            return user;
          }),
        });
        return;
      }
    }
    res.statusCode = 403;
    const error = new Error();
    error.message = 'no qualify of participation of game';
    res.send({ error });
  }
);

export default router;
