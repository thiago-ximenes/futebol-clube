import { Request, Response } from 'express';
import Users from '../database/models/Users';
import loginServices from '../services/loginServices';

interface Payload {
  user: Users;
}

export async function loginController(req: Request, res: Response): Promise<Response> {
  const { email } = req.body;
  const { user } = await loginServices.login(email);

  const token = await loginServices.token(user as Users);

  return res.status(200).json({
    user,
    token,
  });
}

export async function validateTokenController(
  req: Request,
  res: Response,
): Promise<Response | void> {
  const token = req.headers.authorization;

  if (token) {
    const payload = await loginServices.verifyToken(token);

    const { user } = payload as Payload;

    return res.status(200).json(user.role as string);
  }
}
