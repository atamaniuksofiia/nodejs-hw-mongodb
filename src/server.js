import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import cors from 'cors';
import { getEnv } from './utils/getEnv.js';
import { ENV_VARS } from './constants/env.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const startServer = () => {
  const app = express();
  app.use(cors());

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  const loggerHttp = pinoHttp({ logger });

  app.use(loggerHttp);

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = getEnv(ENV_VARS.PORT);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
