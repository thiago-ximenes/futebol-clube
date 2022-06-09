import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const router = Router();

router.get(
  '/teams',
  TeamsController.getAllTeams,
);

export default router;
