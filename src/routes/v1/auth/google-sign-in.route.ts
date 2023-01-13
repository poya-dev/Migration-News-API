import express, { Request, Response } from 'express';

import { verifyGoogleIdToken } from '../../../utils/auth.utils';
import UserRepo from '../../../database/repositories/UserRepo';
import { accessTokenExpiresIn } from '../../../config';
import ApiResponse from '../../../utils/api-response';
import { signJwt } from '../../../utils/auth.utils';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  console.log('::authorization:: ->', authorization);
  if (!authorization || !authorization.startsWith('Bearer'))
    return ApiResponse.failureResponse(res, 401, 'Token not provided');
  const token = authorization.split(' ')[1];
  try {
    const profile = await verifyGoogleIdToken(token);
    if (profile instanceof Error)
      return ApiResponse.failureResponse(
        res,
        401,
        'Google ID token invalid or expired'
      );
    let user = await UserRepo.findOrCreate(profile, 'Google', token);
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = signJwt(payload, { expiresIn: accessTokenExpiresIn });
    return ApiResponse.sendAccessToken(
      res,
      201,
      accessToken,
      'Google sign up success'
    );
  } catch (error: any) {
    return ApiResponse.failureResponse(res, 401, 'Google ID token invalid');
  }
});

export default router;
