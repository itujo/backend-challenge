import { type Request, type Response } from 'express';
import { AuthService } from '../../domain/services/auth-service';

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };
    const newUser = await this.authService.register(name, email, password);
    res.status(201).json(newUser);
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as { email: string; password: string };
    const token = await this.authService.login(email, password);
    res.status(200).json({ token });
  }
}
