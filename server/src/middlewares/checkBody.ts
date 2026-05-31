import { Request, Response, NextFunction } from 'express';

export function checkBody(req: Request, res: Response, next: NextFunction) {
  if (req.body === undefined) req.body = {};
  next();
}
