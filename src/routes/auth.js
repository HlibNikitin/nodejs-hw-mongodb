import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  loginWithGoogleOAuthSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  getGoogleOAuthUrlController,
  loginUserController,
  loginWithGoogleController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const userRouter = Router();

userRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

userRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

userRouter.post('/logout', ctrlWrapper(logoutUserController));
userRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

userRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

userRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

userRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

userRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);
export default userRouter;
