import jwt, { SignOptions } from 'jsonwebtoken';

import { accessTokenPrivateKey, accessTokenPublicKey } from '../config';

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = Buffer.from(accessTokenPrivateKey, 'base64').toString(
    'ascii'
  );
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = (token: string) => {
  const publicKey = Buffer.from(accessTokenPublicKey, 'base64').toString(
    'ascii'
  );
  return jwt.verify(token, publicKey);
};
