import jwt, { SignOptions } from 'jsonwebtoken';

import { testSecretKey } from '../config'; // will be removed
// import { accessTokenPrivateKey, accessTokenPublicKey } from '../config';

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  // const privateKey = Buffer.from(accessTokenPrivateKey, 'base64').toString(
  //   'ascii'
  // );
  return jwt.sign(payload, testSecretKey, {
    ...(options && options),
  });
};

export const verifyJwt = (token: string) => {
  // const publicKey = Buffer.from(accessTokenPublicKey, 'base64').toString(
  //   'ascii'
  // );
  return jwt.verify(token, testSecretKey);
};
