import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import UserRepo from '../../../../database/repositories/UserRepo';
import ApiResponse from '../../../../utils/api-response';
import User from '../../../../types/user.type';

const router = express.Router();

router.get('/bookmark', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const recs = await UserRepo.findBookmarks(new Types.ObjectId(_id));
  return ApiResponse.successResponse(res, 200, recs);
});

router.post('/bookmark', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const { news } = req.body;
  const updateRec = await UserRepo.addBookmark(
    new Types.ObjectId(_id),
    new Types.ObjectId(news)
  );
  return ApiResponse.successResponse(res, 200, updateRec);
});

router.delete('/bookmark/:news', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const { news } = req.params;
  const deleteRec = await UserRepo.removeBookmark(
    new Types.ObjectId(_id),
    new Types.ObjectId(news)
  );
  return ApiResponse.successResponse(res, 200, deleteRec);
});

export default router;
