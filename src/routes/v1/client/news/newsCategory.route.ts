import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import NewsCategoryRepo from '../../../../database/repositories/NewsCategoryRepo';
import LanguageRepo from '../../../../database/repositories/LanguageRepo';
import ApiResponse from '../../../../utils/api-response';

const router = express.Router();

type QueryParam = { lang?: string };

router.get('/', async (req: Request, res: Response) => {
  const { lang = 'fa' } = req.query as QueryParam;
  const allCategories: any = [
    { _id: new Types.ObjectId(), name: lang === 'fa' ? 'همه' : 'توله' },
  ];
  const language = await LanguageRepo.findByCode(lang);
  if (!language)
    return ApiResponse.failureResponse(res, 404, 'Language not found');
  const recs = await NewsCategoryRepo.findByLanguageId(
    new Types.ObjectId(language._id)
  );
  return ApiResponse.successResponse(res, 200, [...allCategories, ...recs]);
});

export default router;
