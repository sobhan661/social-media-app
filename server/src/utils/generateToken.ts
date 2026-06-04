import jwt from 'jsonwebtoken';
import config from '../config/config';

export function generateToken(payload: {
  userId: string;
  username: string;
  loginTime: string;
}) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '1d',
  });
}
