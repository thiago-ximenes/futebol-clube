import { NextFunction, Request, Response } from 'express';
import Team from '../database/models/Teams';

export default class MatchesMiddleware {
  static async sameTeam(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    return next();
  }

  static async checkIfTeamExists(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    const homeTeamExists = await Team.findOne({ where: { id: homeTeam } });
    const awayTeamExists = await Team.findOne({ where: { id: awayTeam } });

    if (!homeTeamExists || !awayTeamExists) {
      return res.status(404).json({
        message: 'There is no team with such id!' });
    }

    return next();
  }
}
