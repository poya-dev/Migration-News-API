import express, { Request, Response } from 'express';
import passport from 'passport';
import _ from 'lodash';

import ApiResponse from '../../../utils/api-response';
import { accessTokenExpiresIn } from '../../../config';
import { signJwt } from '../../../utils/auth.utils';
import User from '../../../types/user.type';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('facebook-token', { session: false }),
  (req: Request, res: Response) => {
    const user = req.user as User;
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = signJwt(payload, { expiresIn: accessTokenExpiresIn });
    return ApiResponse.sendAccessToken(
      res,
      201,
      _.pick(user, ['_id', 'name', 'email', 'isVerified', 'userPictureUrl']),
      token
    );
  }
);

export default router;
