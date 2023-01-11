import dotenv from 'dotenv';

dotenv.config();

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const db = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
};

export const testSecretKey = process.env.TEST_SECRET_KEY || '';
export const accessTokenPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY || '';
export const accessTokenPublicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY || '';
export const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN || '';

export const corsUrl = process.env.CORS_URL;
