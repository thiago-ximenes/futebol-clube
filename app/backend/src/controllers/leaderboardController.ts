import { Request, Response } from 'express';
import LeaderboardServices from '../services/leaderboardServices';

export default class LeaderboardController {
  static async getTeamHomeLeaderboardSortedByTotalPoints(req: Request, res: Response) {
    const teamHomeLeaderboard = await LeaderboardServices
      .getTeamHomeLeaderboardSorted();

    res.status(200).json(teamHomeLeaderboard);
  }
}
