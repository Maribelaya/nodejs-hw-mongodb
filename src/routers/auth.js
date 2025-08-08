import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  refreshUserSessionController,
  logoutUserController,
} from '../controllers/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();

// Реєстрація
authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

// Логін
authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

// Оновлення сесії
authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

// Вихід
authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
