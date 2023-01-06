import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import ApiResponse from '../../../../utils/api-response';
import UserRepo from '../../../../database/repositories/UserRepo';
import IUser from '../../../../types/user.type';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const rec = await UserRepo.findByEmail(req.body.email);
  if (rec) ApiResponse.failureResponse(res, 401, 'User already exists.');
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newRec = await UserRepo.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    userPictureUrl: req.body.userPictureUrl,
  } as IUser);
  return ApiResponse.successResponse(
    res,
    201,
    _.pick(newRec, ['_id', 'name', 'email', 'isVerified', 'userPictureUrl']),
    'User created successfully.'
  );
});

router.get('/', async (req: Request, res: Response) => {
  const recs = await UserRepo.fetchAll();
  return ApiResponse.successResponse(res, 200, recs);
});

router.get('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await UserRepo.findById(new Types.ObjectId(id));
  if (!rec)
    return ApiResponse.failureResponse(res, 404, 'Record does not exist.');
  return ApiResponse.successResponse(res, 200, rec);
});

router.get('/email/:email', async (req: Request, res: Response) => {
  const { email } = req.params;
  const rec = await UserRepo.findByEmail(email);
  if (!rec)
    return ApiResponse.failureResponse(res, 404, 'User does not exist.');
  ApiResponse.successResponse(res, 200, rec);
});

router.put('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await UserRepo.findById(new Types.ObjectId(id));
  if (rec == null)
    return ApiResponse.failureResponse(res, 404, 'User does not exist.');
  if (req.body.name) rec.name = req.body.name;
  if (req.body.userPictureUrl) rec.userPictureUrl = req.body.userPictureUrl;
  const updateRec = await UserRepo.update(rec);
  ApiResponse.successResponse(
    res,
    200,
    updateRec,
    'User updated successfully.'
  );
});

router.delete('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await UserRepo.findById(new Types.ObjectId(id));
  if (!rec)
    return ApiResponse.failureResponse(res, 404, 'User does not exist.');
  const deleteRec = await UserRepo.remove(new Types.ObjectId(id));
  return ApiResponse.successResponse(
    res,
    200,
    _.pick(deleteRec, ['_id', 'name', 'email', 'isVerified', 'userPictureUrl']),
    'User removed successfully.'
  );
});

export default router;
