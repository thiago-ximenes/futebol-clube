import { Router } from 'express';
import matchesMiddleware from '../middlewares/matchesMiddleware';
import matchesController from '../controllers/matchesController';

const router = Router();

router.get(
  '/matches',
  matchesController.getAllMatches,
);

router.post(
  '/matches',
  matchesMiddleware.checkIfTeamExists,
  matchesMiddleware.sameTeam,
  matchesController.createMatch,
);

router.patch(
  '/matches/:id/finish',
  matchesController.finishMatch,
);

router.patch(
  '/matches/:id',
  matchesController.updateMatch,
);

export default router;
