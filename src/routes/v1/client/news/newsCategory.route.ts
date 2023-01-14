import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import NewsCategoryRepo from '../../../../database/repositories/NewsCategoryRepo';
import ApiResponse from '../../../../utils/api-response';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const recs = await NewsCategoryRepo.findAll();
  return ApiResponse.successResponse(
    res,
    200,
    recs,
    'Records fetched successfully'
  );
});

router.get('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsCategoryRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  return ApiResponse.successResponse(
    res,
    200,
    rec,
    'Record fetched successfully'
  );
});

export default router;
