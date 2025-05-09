import {
  loginUserController,
  resetPasswordController,
} from '../controllers/auth.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema, 
} from '../validation/auth.js';
import {
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
} from '../controllers/auth.js';

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validBody } from '../middlewares/validBody.js';

const router = Router();
router.post(
  '/register',
  validBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/logout', ctrlWrapper(logoutUserController));

router.post(
  '/send-reset-email',
  validBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
router.post(
  '/reset-pwd',
  validBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;