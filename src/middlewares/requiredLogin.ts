import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import UserRepo from '../database/repositories/UserRepo';
import { verifyJwt } from '../utils/auth.utils';
import ApiResponse from '../utils/api-response';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer'))
    return ApiResponse.failureResponse(res, 401, 'Token not provided');
  const token = authorization.split(' ')[1];
  try {
    const decoded = verifyJwt(token);
    const user = await UserRepo.findById(new Types.ObjectId(decoded._id));
    if (!user)
      return ApiResponse.failureResponse(res, 404, 'User does not exists');
    req.user = user;
    next();
  } catch (err: any) {
    return ApiResponse.failureResponse(res, 401, 'Invalid token');
  }
};
