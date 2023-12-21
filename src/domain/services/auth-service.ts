import jwt from 'jsonwebtoken';
import { type UserService } from '.';
import env from '../../main/config/environments/application';

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.validateUser(email, password);
    if (!user) throw new Error('invalid credentials');

    const token = jwt.sign({ userId: user.id }, env.jwtSecret, {
      expiresIn: '7d',
    });
    return token;
  }

  async register(name: string, email: string, password: string): Promise<any> {
    const newUser = await this.userService.createUser(name, email, password);
    return newUser;
  }
}
