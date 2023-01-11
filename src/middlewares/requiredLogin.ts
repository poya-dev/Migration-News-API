import { Request, Response, NextFunction } from 'express';

// import UserRepo from '../database/repositories/UserRepo';
import { verifyJwt } from '../utils/auth.utils';
import ApiResponse from '../utils/api-response';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization)
    return ApiResponse.failureResponse(res, 401, 'Token not provided');
  if (!req.headers.authorization.startsWith('Bearer'))
    return ApiResponse.failureResponse(res, 401, 'Token not provided');
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = verifyJwt(token);
    console.log('::::decoded::::', decoded);
    next();
    // res.locals.user = await UserRepo.findById(decoded._id);
  } catch (err: any) {
    return ApiResponse.failureResponse(res, 401, 'Invalid token');
  }
};
