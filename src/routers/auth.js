import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { ctrlController } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlController(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlController(loginUserController),
);

router.post('/refresh', ctrlController(refreshUserSessionController));

router.post('/logout', ctrlController(logoutUserController));

export default router;
