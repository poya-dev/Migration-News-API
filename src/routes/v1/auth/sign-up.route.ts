import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import UserRepo from '../../../database/repositories/UserRepo';
import ApiResponse from '../../../utils/api-response';
import User from '../../../types/user.type';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const rec = await UserRepo.findByEmail(req.body.email);
  if (rec) return ApiResponse.failureResponse(res, 401, 'User already exists');
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newRec = await UserRepo.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    userPictureUrl: req.body.imageUrl,
  } as User);

  return ApiResponse.successResponse(
    res,
    201,
    _.pick(newRec, ['_id', 'name', 'email', 'userPictureUrl']),
    'Signed-up success'
  );
});

export default router;
