import { readFileSync } from 'fs';
import { sign, SignOptions, verify } from 'jsonwebtoken';

export default class Jwt {
  private static _jwtSecret = readFileSync('./jwt.evaluation.key', 'utf8');
  private static _jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  public static async createToken(user: string | object | Buffer): Promise<string> {
    return sign({ user }, this._jwtSecret, this._jwtConfig);
  }

  public static async verify(token: string) {
    return verify(token, this._jwtSecret);
  }
}
