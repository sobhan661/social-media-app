import express from 'express';

import { checkBody } from './src/middlewares/checkBody';
import { authRouter } from './src/routes/authRoutes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkBody);

app.use('/', authRouter);

export default app;
