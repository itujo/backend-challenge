import { type Request, type Response } from 'express';
import { AuthService } from './auth-service';

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
    try {
      const newUser = await this.authService.register(name, email, password);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as { email: string; password: string };
    try {
      const token = await this.authService.login(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}
