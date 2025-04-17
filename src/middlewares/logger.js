import pino from 'pino';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export const logMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};
