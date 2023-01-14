import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import UserRepo from '../database/repositories/UserRepo';
import User from '../types/user.type';

export default async (req: Request, res: Response, next: NextFunction) => {
  const id = (req.user as User)._id;
  await UserRepo.updateLastSeen(new Types.ObjectId(id));
  next();
};
