import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

router.get(
  '/leaderboard/home',
  LeaderboardController.getTeamHomeLeaderboardSortedByTotalPoints,
);

export default router;
