import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import NewsCategoryRepo from '../../../../database/repositories/NewsCategoryRepo';
import LanguageRepo from '../../../../database/repositories/LanguageRepo';
import ApiResponse from '../../../../utils/api-response';

const router = express.Router();

type QueryParam = { lang?: string };

router.get('/', async (req: Request, res: Response) => {
  const { lang = 'en' } = req.query as QueryParam;
  const language = await LanguageRepo.findByCode(lang);
  if (!language)
    return ApiResponse.failureResponse(res, 404, 'Language not found');
  const recs = await NewsCategoryRepo.findByLanguageId(
    new Types.ObjectId(language._id)
  );
  return ApiResponse.successResponse(res, 200, recs);
});

export default router;
