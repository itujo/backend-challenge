import 'express-async-errors';
import express from 'express';
import { readdirSync } from 'fs';
import { type Server } from 'http';
import path from 'path';
import env from './environments/application';

export class App {
  public readonly app: express.Express;

  private server!: Server;

  constructor() {
    this.app = express();
  }

  getApp(): express.Express {
    return this.app;
  }

  setupEnvironment(): this {
    this.app.use(express.json());
    return this;
  }

  errorHandler(
    error: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ): express.Response {
    if (env.mode === 'development') {
      console.log(error);
      return res.status(Number((error as any)?.statusCode) ?? 400).json({
        error: error.message,
      });
    }
    return res.status(500).json({ error: error.message });
  }

  async setupRoutes(): Promise<this> {
    const router = express.Router();
    this.app.get('/', (_, res) => res.status(200).send('ok'));
    router.get('/', (_, res) => res.status(200).send('ok'));

    this.app.use('/api', router);
    const routesPath = path.resolve(__dirname, '..', 'routes');
    const files = readdirSync(routesPath).filter(
      (file) => file.includes('-route') && !file.endsWith('.map'),
    );

    for await (const file of files) {
      const routeModule = await import(path.resolve(routesPath, file));

      routeModule.default(router);
    }
    this.app.use(this.errorHandler.bind(this));
    return this;
  }

  async disconnect(): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      this.server.close((error) => {
        if (error != null) {
          reject(error);
          return;
        }
        resolve(true);
      });
    });
  }

  listen(port: number): void {
    this.server = this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}
