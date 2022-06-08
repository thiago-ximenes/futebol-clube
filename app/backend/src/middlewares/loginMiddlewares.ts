import { NextFunction, Request, Response } from 'express';
import LoginServices from '../services/loginServices';

export default class LoginMiddlewares {
  public static async verifyEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const { user } = await LoginServices.login(email);

    if (!user) {
      return res.status(401).json({
        message: 'Incorrect email or password',
      });
    }

    return next();
  }

  public static async verifyPassword(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const isMatch = await LoginServices.verifyPassword(password, email);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Incorrect email or password',
      });
    }

    return next();
  }

  public static async isEmailEmpty(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (email === '') {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }

    return next();
  }

  public static async isPasswordEmpty(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;

    if (password === '') {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }

    return next();
  }
}
