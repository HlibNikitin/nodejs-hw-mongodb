import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  deleteContactController,
  getContactController,
  getContactsByIdController,
  patchContactsController,
  postContactsController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/contact.js';
import { isValidID } from '../middlewares/isValidID.js';

const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactController));

contactRouter.get('/:id', isValidID, ctrlWrapper(getContactsByIdController));

contactRouter.post(
  '/',
  validateBody(createStudentSchema),
  ctrlWrapper(postContactsController),
);

contactRouter.patch(
  '/:id',
  isValidID,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchContactsController),
);

contactRouter.delete('/:id', isValidID, ctrlWrapper(deleteContactController));

export default contactRouter;
