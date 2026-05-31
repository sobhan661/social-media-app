import express from 'express';

import { checkBody } from './src/middlewares/checkBody';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkBody);
