import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import UserRepo from '../../../../database/repositories/UserRepo';
import ApiResponse from '../../../../utils/api-response';
import User from '../../../../types/user.type';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const recs = await UserRepo.findBookmarks(new Types.ObjectId(_id));
  return ApiResponse.successResponse(res, 200, recs);
});

router.put('/add/:newsId', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const { newsId } = req.params;
  const updateRec = await UserRepo.addBookmark(
    new Types.ObjectId(_id),
    new Types.ObjectId(newsId)
  );
  return ApiResponse.successResponse(res, 200, updateRec);
});

router.put('/remove/:newsId', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const { newsId } = req.params;
  const deleteRec = await UserRepo.removeBookmark(
    new Types.ObjectId(_id),
    new Types.ObjectId(newsId)
  );
  return ApiResponse.successResponse(res, 200, deleteRec);
});

export default router;
