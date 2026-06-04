import { expressjwt } from 'express-jwt';

import config from './config';

function jwt() {
  return expressjwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
  });
}

export default jwt;
