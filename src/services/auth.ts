import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import config from 'config';
import { User } from '@src/models/user';

export interface DecodedUser extends Omit<User, '_id'> {
  id: string;
}

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  public static generateToken(payload: object): string {
    return sign(payload, config.get('App.auth.key'), {
      expiresIn: config.get('App.auth.tokenExpiresIn'),
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return verify(token, config.get('App.auth.key')) as DecodedUser;
  }
}
