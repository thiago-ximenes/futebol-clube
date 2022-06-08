import * as bcrypt from 'bcryptjs';
import Jwt from '../utils/jwt';
import Users from '../database/models/Users';

export default class LoginServices {
  public static async login(email: string) {
    const user = await Users.findOne({
      where: {
        email,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    return {
      user,
    };
  }

  public static async verifyPassword(password: string, email: string) {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    return bcrypt.compare(password, user?.password as string);
  }

  public static async token(user: Users): Promise<string> {
    const newToken = await Jwt.createToken(user);
    return newToken;
  }
}
