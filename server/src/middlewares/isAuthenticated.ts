import { Request, Response, NextFunction } from 'express';

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.auth?.userId) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
  next();
}
