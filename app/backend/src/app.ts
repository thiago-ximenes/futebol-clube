import * as express from 'express';
import loginRouter from './routers/loginRouter';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    const { app } = this;

    app.use(accessControl);
    app.use(express.json());
    app.use(loginRouter);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
