import express, { Response, Request, Application, NextFunction } from 'express';
import { BadRequest, Unauthorized } from './httpError/httpError';
import { apiRouter } from './controllers/api.router';

function initServer(): Application {
  const app: Application = express();
  app.use(express.json());

  app.use('/api', apiRouter);

  const handleErrors = async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (
      // TODO : extract
      err instanceof BadRequest ||
      err instanceof Unauthorized
    ) {
      res.status(err.httpStatus);
      if (err.body) {
        return res.json(err.body);
      }
      return res.send({ error: err.message });
    }
    res.sendStatus(500);
  };

  app.use(handleErrors);

  return app;
}

export default initServer;
