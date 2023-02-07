import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import _ from 'lodash';

import UserRepo from '../../../../database/repositories/UserRepo';
import ApiResponse from '../../../../utils/api-response';
import User from '../../../../types/user.type';

const router = express.Router();

router.get('/me', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const rec = await UserRepo.findById(new Types.ObjectId(_id));
  return ApiResponse.successResponse(
    res,
    200,
    _.pick(rec, ['_id', 'name', 'email', 'userPictureUrl', 'deviceToken'])
  );
});

router.post('/device-token', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const rec = await UserRepo.findById(new Types.ObjectId(_id));
  if (!rec) {
    return ApiResponse.failureResponse(res, 404, 'User does not exist');
  }
  if (req.body.deviceToken) rec.deviceToken = req.body.deviceToken;
  const newRec = UserRepo.update(req.body.deviceToken);
  return ApiResponse.successResponse(
    res,
    200,
    _.pick(newRec, ['_id', 'name', 'email', 'userPictureUrl', 'deviceToken'])
  );
});

export default router;
