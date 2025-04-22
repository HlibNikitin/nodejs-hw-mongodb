import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlController } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlController(getAllContactsController));

router.get('/contacts/:contactId', ctrlController(getContactByIdController));

router.post('/contacts/', ctrlController(createContactController));

router.patch('/contacts/:contactId', ctrlController(patchContactController));

router.delete('/contacts/:contactId', ctrlController(deleteContactController));

export default router;
