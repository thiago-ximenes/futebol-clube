import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const router = Router();

router.get(
  '/teams',
  TeamsController.getAllTeams,
);

router.get(
  '/teams/:id',
  TeamsController.getById,
);

export default router;
