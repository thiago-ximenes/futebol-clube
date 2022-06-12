import { Request, Response } from 'express';
import MatchesServices from '../services/matchesServices';

export default class MatchesController {
  static async getAllMatches(_req: Request, res: Response) {
    const result = await MatchesServices.getAllMatches();

    return res.status(200).json(result);
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    const result = await MatchesServices.createMatch({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    return res.status(201).json(result);
  }
}
