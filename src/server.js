import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import contactRouter from './routes/contacts.js';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.get(logger);

  app.use('/contacts', contactRouter);

  app.get(notFoundHandler);

  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => console.log(`Server starting on ${port} port`));
};
