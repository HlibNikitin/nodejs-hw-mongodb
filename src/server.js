import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import contactRouter from './routes/contacts.js';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import userRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.get(logger);

  app.use('/contacts', contactRouter);
  app.use('/auth', userRouter);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.get(notFoundHandler);

  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => console.log(`Server starting on ${port} port`));
};
