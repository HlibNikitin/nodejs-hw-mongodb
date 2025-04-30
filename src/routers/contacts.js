import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlController } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlController(getAllContactsController));

router.get('/:contactId', isValidId, ctrlController(getContactByIdController));

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlController(createContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlController(patchContactController),
);

router.delete(
  '/:contactId',
  isValidId,
  ctrlController(deleteContactController),
);

export default router;
