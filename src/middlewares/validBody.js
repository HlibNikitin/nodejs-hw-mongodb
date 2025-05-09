import createHttpError from 'http-errors';

export const validBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'no valid body', {
      errors: err.details,
    });
    next(error);
  }
};