import jwt from 'jsonwebtoken';
import { UserService } from '../../domain/services/user-service';
import env from '../../main/config/environments/application';

export class AuthService {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.validateUser(email, password);
    if (!user) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id }, env.jwtSecret, { expiresIn: '7d' });
    return token;
  }

  async register(name: string, email: string, password: string): Promise<any> {
    const newUser = await this.userService.createUser(name, email, password);
    return newUser;
  }
}
