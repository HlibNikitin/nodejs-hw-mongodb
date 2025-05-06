import { Router } from 'express';
import routerContacts from './contacts-router.js';
import routerAuth from './auth.js';

const router = Router();

router.use('/contacts', routerContacts);
router.use('/auth', routerAuth);

export default router;