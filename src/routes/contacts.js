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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactRouter = Router();
contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(getContactController));

contactRouter.get('/:id', isValidID, ctrlWrapper(getContactsByIdController));

contactRouter.post(
  '/',
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(postContactsController),
);

contactRouter.patch(
  '/:id',
  upload.single('photo'),
  isValidID,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchContactsController),
);

contactRouter.delete('/:id', isValidID, ctrlWrapper(deleteContactController));

export default contactRouter;
