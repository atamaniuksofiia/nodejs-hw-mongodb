import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import cors from 'cors';
import { getEnv } from './utils/getEnv.js';
import { ENV_VARS } from './constants/env.js';
import {
  getContacts,
  getContactByIdController,
} from './controllers/contactController.js';

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

  app.get('/contacts', getContacts);

  app.get('/contacts/:contactId', getContactByIdController);

  const PORT = getEnv(ENV_VARS.PORT);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
