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

const router = Router();

router.get('/contacts', ctrlController(getAllContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlController(getContactByIdController),
);

router.post(
  '/contacts/',
  validateBody(createContactSchema),
  ctrlController(createContactController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlController(patchContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlController(deleteContactController),
);

export default router;
