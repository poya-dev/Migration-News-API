import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import NewsCategoryRepo from '../../../../database/repositories/NewsCategoryRepo';
import LanguageRepo from '../../../../database/repositories/LanguageRepo';
import NewsRepo from '../../../../database/repositories/NewsRepo';
import NewsModel from '../../../../database/models/News.model';
import ApiResponse from '../../../../utils/api-response';
import User from '../../../../types/user.type';

const router = express.Router();

type QueryParam = {
  lang?: string;
  category?: string;
  page?: number;
  limit?: number;
};

type SearchQueryParam = {
  term?: string;
  lang?: string;
};

router.get('/', async (req: Request, res: Response) => {
  const {
    category,
    lang = 'fa',
    page = 1,
    limit = 10,
  } = req.query as QueryParam;
  const currentPage = Number(page);
  const pageLimit = Number(limit);
  const filter = { status: 'Published' };
  const user = { user: (req.user as User)._id };
  const language = await LanguageRepo.findByCode(lang);
  if (!language)
    return ApiResponse.failureResponse(res, 404, 'Language not found');
  let categoryRec;
  if (category) categoryRec = await NewsCategoryRepo.findByName(category);
  Object.assign(filter, { 'language.name': language.name });
  categoryRec && Object.assign(filter, { 'category.name': categoryRec.name });
  const recs = await NewsRepo.findNews(user, filter, currentPage, pageLimit);
  const count = await NewsModel.countDocuments(filter);
  const lastPage = Math.ceil(count / pageLimit);
  return ApiResponse.successResponse(res, 200, recs, currentPage, lastPage);
});

router.get('/id/:id', async (req: Request, res: Response) => {
  const user = req.user as User;
  const { id } = req.params;
  const rec = await NewsRepo.findAndUpdateViewCount(
    new Types.ObjectId(user._id),
    new Types.ObjectId(id)
  );
  if (rec.length > 0) {
    return ApiResponse.successResponse(res, 200, rec);
  }
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
});

router.get('/search', async (req: Request, res: Response) => {
  const { term = '', lang = 'fa' } = req.query as SearchQueryParam;
  const language = await LanguageRepo.findByCode(lang);
  if (!language)
    return ApiResponse.failureResponse(res, 404, 'Language not found');
  const user = { user: (req.user as User)._id };
  const filter = {
    'language.name': language.name,
    title: { $regex: term, $options: 'i' },
    status: 'Published',
  };
  const recs = await NewsRepo.search(user, filter);
  return ApiResponse.successResponse(res, 200, recs);
});

export default router;
