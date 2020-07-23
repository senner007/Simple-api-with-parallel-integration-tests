import initServer from './server';
import { Application } from 'express';

(async () => {
  try {
    // Run server
    const app: Application = initServer();
    const port: number = 8080; // default port to listen

    app.listen(port, () => {
      console.log('ENVIRONMENT : ' + process.env.ENVIRONMENT);
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
