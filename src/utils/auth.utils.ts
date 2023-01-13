import jwt, { SignOptions } from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

import { testSecretKey, googleClientId } from '../config'; // will be removed
// import { accessTokenPrivateKey, accessTokenPublicKey } from '../config'; // later this will be used

const client = new OAuth2Client(googleClientId);

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  // const privateKey = Buffer.from(accessTokenPrivateKey, 'base64').toString(
  //   'ascii'
  // );
  return jwt.sign(payload, testSecretKey, {
    ...(options && options),
  });
};

export const verifyJwt = (token: string): any => {
  // const publicKey = Buffer.from(accessTokenPublicKey, 'base64').toString(
  //   'ascii'
  // );
  return jwt.verify(token, testSecretKey);
};

export const verifyGoogleIdToken = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({ idToken: token });
    return ticket.getPayload();
  } catch (error: any) {
    throw new Error('Google ID token is invalid or expired');
  }
};
