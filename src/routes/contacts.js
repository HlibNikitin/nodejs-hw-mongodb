import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  deleteContactController,
  getContactController,
  getContactsByIdController,
  patchContactsController,
  postContactsController,
} from '../controllers/contacts.js';

const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactController));

contactRouter.get('/:id', ctrlWrapper(getContactsByIdController));

contactRouter.post('/', ctrlWrapper(postContactsController));

contactRouter.patch('/:id', ctrlWrapper(patchContactsController));

contactRouter.delete('/:id', ctrlWrapper(deleteContactController));

export default contactRouter;
