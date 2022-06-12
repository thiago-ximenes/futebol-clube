import { Router } from 'express';
import MatchesMiddleware from '../middlewares/matchesMiddleware';
import matchesController from '../controllers/matchesController';

const router = Router();

router.get(
  '/matches',
  matchesController.getAllMatches,
);

router.post(
  '/matches',
  MatchesMiddleware.sameTeam,
  matchesController.createMatch,
);

router.patch(
  '/matches/:id/finish',
  matchesController.finishMatch,
);

export default router;
