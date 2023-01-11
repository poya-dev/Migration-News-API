import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import UserRepo from '../../../database/repositories/UserRepo';
import ApiResponse from '../../../utils/api-response';
import { signJwt } from '../../../utils/auth.utils';
import { accessTokenExpiresIn } from '../../../config';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const rec = await UserRepo.findByEmail(req.body.email);
  if (!rec) return ApiResponse.failureResponse(res, 401, 'User not registered');
  const match = await bcrypt.compare(req.body.password, rec.password);
  if (!match)
    return ApiResponse.failureResponse(res, 401, 'Incorrect password');
  const payload = {
    _id: rec._id,
    name: rec.name,
    email: rec.email,
    role: rec.role,
  };
  const token = signJwt(payload, { expiresIn: accessTokenExpiresIn });
  return ApiResponse.sendAccessToken(res, 200, token, 'Login success.');
});

export default router;
