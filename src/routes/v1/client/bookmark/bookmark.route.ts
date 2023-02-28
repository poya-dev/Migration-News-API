import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import BookmarkRepo from '../../../../database/repositories/BookmarkRepo';
import ApiResponse from '../../../../utils/api-response';
import Bookmark from '../../../../types/bookmark.type';
import User from '../../../../types/user.type';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const recs = await BookmarkRepo.findUserBookmarks(new Types.ObjectId(_id));
  return ApiResponse.successResponse(res, 200, recs);
});

router.post('/', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const { news } = req.body;
  const bookmark = {
    user: new Types.ObjectId(_id),
    news: new Types.ObjectId(news),
  } as Bookmark;
  const isBookmark = await BookmarkRepo.findByFilter(bookmark);
  if (isBookmark) {
    return ApiResponse.failureResponse(res, 401, 'Already exist');
  }
  const newRec = await BookmarkRepo.add(bookmark);
  return ApiResponse.successResponse(res, 200, newRec);
});

router.delete('/id/:news', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const { news } = req.params;
  const filter = {
    user: new Types.ObjectId(_id),
    news: new Types.ObjectId(news),
  };
  const deleteRec = await BookmarkRepo.remove(filter);
  return ApiResponse.successResponse(res, 200, deleteRec);
});

export default router;
