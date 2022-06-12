import { Router } from 'express';
import matchesController from '../controllers/matchesController';

const router = Router();

router.get(
  '/matches',
  matchesController.getAllMatches,
);

export default router;
