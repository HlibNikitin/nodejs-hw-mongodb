import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidID = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(
      createHttpError(
        400,
        `Invalid ID format: "${id}" is not a valid MongoDB ObjectId`,
      ),
    );
  }
  next();
};
