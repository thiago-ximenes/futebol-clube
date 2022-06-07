import { NextFunction, Request, Response } from 'express';
import Users from '../database/models/Users';

export default class LoginMiddlewares {
  public static async verifyEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const user = await Users.findOne({
      where: {
        email,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Incorrect email or password',
      });
    }

    return next();
  }

  public static async verifyPassword(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (user?.password !== password) {
      return res.status(401).json({
        message: 'Incorrect email or password',
      });
    }

    return next();
  }
}
