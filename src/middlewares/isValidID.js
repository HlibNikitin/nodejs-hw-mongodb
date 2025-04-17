import { isValidObjectId } from 'mongoose';

export const isValidID = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: `Invalid ID format: "${id}" is not a valid MongoDB ObjectId`,
    });
  }

  next();
};
