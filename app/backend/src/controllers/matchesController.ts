import { Request, Response } from 'express';
import MatchesServices from '../services/matchesServices';

export default class MatchesController {
  static async getAllMatches(_req: Request, res: Response) {
    const result = await MatchesServices.getAllMatches();

    return res.status(200).json(result);
  }
}
