import 'express-jwt';

declare module 'express-jwt' {
  interface JwtPayload {
    userId: string;
    username: string;
    loginTime: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      auth?: import('express-jwt').JwtPayload;
    }
  }
}
