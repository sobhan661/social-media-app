import express from 'express';

import { checkBody } from './src/middlewares/checkBody';
import { authRouter } from './src/routes/authRoutes';
import jwt from './src/config/jwt';
import globalErrorHandler from './src/middlewares/globalErrorHandler';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkBody);

// JWT
app.use(jwt());

app.use('/', authRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
