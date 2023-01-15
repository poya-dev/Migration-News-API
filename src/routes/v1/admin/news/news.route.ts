import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import NewsRepo from '../../../../database/repositories/NewsRepo';
import ApiResponse from '../../../../utils/api-response';
import News from '../../../../types/news.type';
import User from '../../../../types/user.type';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const rec = await NewsRepo.findByTitle(req.body.title);
  if (rec)
    return ApiResponse.failureResponse(res, 401, 'Record already exists.');
  const newRec = await NewsRepo.create({
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    language: req.body.language,
    category: req.body.category,
    channel: req.body.channel,
    createdBy: (req.user as User)._id,
    updatedBy: (req.user as User)._id,
  } as News);
  return ApiResponse.successResponse(
    res,
    201,
    newRec,
    'Record created successfully.'
  );
});

router.get('/', async (req: Request, res: Response) => {
  const recs = await NewsRepo.findAll();
  return ApiResponse.successResponse(
    res,
    200,
    recs,
    'Records fetched successfully.'
  );
});

router.get('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found.');
  return ApiResponse.successResponse(
    res,
    200,
    rec,
    'Record fetched successfully.'
  );
});

router.put('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  if (req.body.title) rec.title = req.body.title;
  if (req.body.content) rec.content = req.body.content;
  if (req.body.imageUrl) rec.imageUrl = req.body.imageUrl;
  if (req.body.language) rec.language = req.body.language;
  if (req.body.category) rec.category = req.body.category;
  if (req.body.channel) rec.channel = req.body.channel;
  rec.updatedBy = (req.user as User)._id;
  const updateRec = await NewsRepo.update(rec);
  return ApiResponse.successResponse(
    res,
    200,
    updateRec,
    'Record updated successfully'
  );
});

router.delete('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  const deleteRec = await NewsRepo.remove(new Types.ObjectId(id));
  return ApiResponse.successResponse(
    res,
    200,
    deleteRec,
    'Record deleted successfully.'
  );
});

export default router;
