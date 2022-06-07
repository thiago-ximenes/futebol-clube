import { Router } from 'express';
import LoginMiddlewares from '../middlewares/loginMiddlewares';
import loginController from '../controllers/loginController';

const router = Router();

router.post(
  '/login',
  LoginMiddlewares.verifyEmail,
  loginController,
);

export default router;
