import express from 'express';
import helmet from 'helmet';
import GlobalConfig from './config/GlobalConfig';
import { cacheMiddleware, errorHandler, optionsMiddleware, tidMiddleware } from './handler/Middlewares';
import './sequelize/Sequelize';
import { handler as userHandler } from './user/Handler';

export default () => initApp();

export function initApp({ port = GlobalConfig.PORT } = {}) {
  return new Promise(async (resolve) => {
    const app = express();

    app.disable('etag');

    app.use(helmet());

    app.get('/', (req, res) => res.status(200).send('ok'));
    app.get('/ping', (req, res) => res.status(200).send('pong'));

    app.use(optionsMiddleware);
    app.use(cacheMiddleware);
    app.use(tidMiddleware);

    app.use('/v1/user', userHandler());

    app.use(errorHandler);

    app.listen(port, '0.0.0.0', () => {
      console.log(`App listening on port %s`, port);
      resolve(app);
    });
  });
}

