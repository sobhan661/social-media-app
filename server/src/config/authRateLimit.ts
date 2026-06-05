import rateLimit from 'express-rate-limit';

export const signupLimiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 10,
  message: { error: 'Too many signup attempts, try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 1000 * 60 * 45,
  max: 12,
  message: { error: 'Too many login attempts, try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});
