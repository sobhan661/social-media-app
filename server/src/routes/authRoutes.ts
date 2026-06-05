import { Router } from 'express';

import { signup, login } from '../controllers/auth';
import { signupLimiter, loginLimiter } from '../config/authRateLimit';

export const authRouter = Router();

authRouter.post('/signup', signupLimiter, signup);
authRouter.post('/login', loginLimiter, login);
