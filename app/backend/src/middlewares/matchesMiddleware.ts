import { NextFunction, Request, Response } from 'express';

export default class MatchesMiddleware {
  static async sameTeam(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    return next();
  }
}
