import './config/dotenv';

import { App } from './config/app';
import env from './config/environments/application';

class ServerSetup {
  private app!: App;

  public async start(): Promise<void> {
    this.app = await new App().setupEnvironment().setupRoutes();
    this.app.listen(env.port);
  }

  public async stop(): Promise<void> {
    await this.app.disconnect();

    process.exitCode = 0;
  }
}

const serviceSetup = new ServerSetup();

serviceSetup.start().catch((error) => {
  console.error('Failed to start the server:', error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  serviceSetup
    .stop()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to stop the server gracefully:', error);
      process.exit(1);
    });
});
