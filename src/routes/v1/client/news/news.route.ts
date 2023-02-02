import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import LanguageRepo from '../../../../database/repositories/LanguageRepo';
import NewsRepo from '../../../../database/repositories/NewsRepo';
import ApiResponse from '../../../../utils/api-response';
import NewsModel from '../../../../database/models/News.model';

const router = express.Router();

type QueryParam = {
  lang?: string;
  category?: string;
  page?: string;
  limit?: string;
};

router.get('/', async (req: Request, res: Response) => {
  const {
    category,
    lang = 'en',
    page = '1',
    limit = '10',
  } = req.query as QueryParam;
  const language = await LanguageRepo.findByCode(lang);
  if (!language)
    return ApiResponse.failureResponse(res, 404, 'Language not found');
  const filter = { status: 'Published' };
  Object.assign(filter, { language: new Types.ObjectId(language._id) });
  category && Object.assign(filter, { category: new Types.ObjectId(category) });
  const recs = await NewsRepo.findNews(filter, parseInt(page), parseInt(limit));
  const count = await NewsModel.countDocuments(filter);
  const lastPage = Math.ceil(count / parseInt(limit));
  return ApiResponse.successResponse(res, 200, recs, parseInt(page), lastPage);
});

router.get('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsRepo.findAndUpdateViewCount(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  return ApiResponse.successResponse(res, 200, rec);
});

export default router;
