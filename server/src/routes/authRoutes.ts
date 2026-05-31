import { Router } from 'express';

import { signup } from '../controllers/auth';

export const authRouter = Router();

authRouter.post('/signup', signup);
