import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import NewsRepo from '../../../../database/repositories/NewsRepo';
import ApiResponse from '../../../../utils/api-response';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const recs = await NewsRepo.findAll();
  return ApiResponse.successResponse(
    res,
    200,
    recs,
    'Records fetched successfully'
  );
});

router.get('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsRepo.findById(new Types.ObjectId());
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  return ApiResponse.successResponse(
    res,
    200,
    rec,
    'Record fetched successfully'
  );
});

export default router;
