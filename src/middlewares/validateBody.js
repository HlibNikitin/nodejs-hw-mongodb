export const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (err) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: err.message,
      });
    }
  };
  return func;
};
