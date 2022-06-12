import { Request, Response } from 'express';
import TeamsServices from '../services/teamsServices';

export default class TeamsController {
  static async getAllTeams(_req: Request, res: Response) {
    const result = await TeamsServices.getAllTeams();

    return res.status(200).json(result);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const result = await TeamsServices.getById(Number(id));

    return res.status(200).json(result);
  }
}
