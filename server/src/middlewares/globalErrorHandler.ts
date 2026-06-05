import { Request, Response, NextFunction } from 'express';

import config from '../config/config';

function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (config.nodeEnv === 'developement') {
    console.error('Unhandled Error: ', err);
    return res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }

  console.error('Unhandled Error: ', err);
  return res.status(500).json({ error: 'Internal Server Error' });
}

export default globalErrorHandler;
