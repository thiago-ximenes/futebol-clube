import { Router } from 'express';
import matchesController from '../controllers/matchesController';

const router = Router();

router.get(
  '/matches',
  matchesController.getAllMatches,
);

router.post(
  '/matches',
  matchesController.createMatch,
);

router.patch(
  '/matches/:id/finish',
  matchesController.finishMatch,
);

export default router;
