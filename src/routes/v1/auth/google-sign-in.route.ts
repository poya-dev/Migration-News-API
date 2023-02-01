import express, { Request, Response } from 'express';
import _ from 'lodash';

import { verifyGoogleIdToken } from '../../../utils/auth.utils';
import UserRepo from '../../../database/repositories/UserRepo';
import { accessTokenExpiresIn } from '../../../config';
import ApiResponse from '../../../utils/api-response';
import { signJwt } from '../../../utils/auth.utils';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer'))
    return ApiResponse.failureResponse(res, 401, 'Google ID token is required');
  const token = authorization.split(' ')[1];
  try {
    const profile = await verifyGoogleIdToken(token);
    if (profile instanceof Error)
      return ApiResponse.failureResponse(
        res,
        401,
        'Google ID token is invalid or expired'
      );
    let user = await UserRepo.findOrCreate(profile, 'Google');
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
      _.pick(user, ['_id', 'name', 'email', 'isVerified', 'userPictureUrl']),
      accessToken
    );
  } catch (error: any) {
    return ApiResponse.failureResponse(res, 401, 'Google ID token invalid');
  }
});

export default router;
