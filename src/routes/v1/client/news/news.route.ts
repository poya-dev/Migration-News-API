import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import LanguageRepo from '../../../../database/repositories/LanguageRepo';
import NewsRepo from '../../../../database/repositories/NewsRepo';
import ApiResponse from '../../../../utils/api-response';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const langCode = req.query.langCode as string;
  const language = await LanguageRepo.findByCode(langCode);
  if (!language)
    return ApiResponse.failureResponse(res, 404, 'Language not found');
  const recs = await NewsRepo.findByLanguageId(
    new Types.ObjectId(language._id)
  );
  return ApiResponse.successResponse(
    res,
    200,
    recs,
    'Records fetched successfully'
  );
});

router.get('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsRepo.findAndUpdateViewCount(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  return ApiResponse.successResponse(
    res,
    200,
    rec,
    'Record fetched successfully'
  );
});

export default router;
