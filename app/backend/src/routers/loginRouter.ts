import { Router } from 'express';
import LoginMiddlewares from '../middlewares/loginMiddlewares';
import { loginController, validateTokenController } from '../controllers/loginController';

const router = Router();

router.post(
  '/login',
  LoginMiddlewares.isEmailEmpty,
  LoginMiddlewares.isPasswordEmpty,
  LoginMiddlewares.verifyEmail,
  LoginMiddlewares.verifyPassword,
  loginController,
);

router.get(
  '/login/validate',
  validateTokenController,
);

export default router;
