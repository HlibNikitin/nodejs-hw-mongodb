import { Router } from 'express';
import { getContactsController, getContactByIdController, createContactController, deleteContactController, patchContactController } from '../controllers/contacts.js';
import { contactCreateSchema, contactUpdateSchema } from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const routerContacts = Router();

routerContacts.use(authenticate);

routerContacts.get('/', ctrlWrapper(getContactsController));
routerContacts.get('/:contactId', ctrlWrapper(getContactByIdController));
routerContacts.post('/', upload.single('photo'), validateBody(contactCreateSchema), ctrlWrapper(createContactController));
routerContacts.delete('/:contactId', ctrlWrapper(deleteContactController));
routerContacts.patch('/:contactId', upload.single('photo'), validateBody(contactUpdateSchema), ctrlWrapper(patchContactController));

export default routerContacts;