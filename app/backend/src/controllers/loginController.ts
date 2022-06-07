import { Request, Response } from 'express';
import Users from '../database/models/Users';
import loginServices from '../services/loginServices';

export default async function loginController(req: Request, res: Response): Promise<Response> {
  const { email } = req.body;
  const { user } = await loginServices.login(email);

  const token = await loginServices.token(user as Users);

  return res.status(200).json({
    user,
    token,
  });
}
