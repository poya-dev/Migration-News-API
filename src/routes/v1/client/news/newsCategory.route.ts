import express, { Request, Response } from 'express';

import NewsCategoryRepo from '../../../../database/repositories/NewsCategoryRepo';
import ApiResponse from '../../../../utils/api-response';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const langCode = req.query.langCode as string;
  const recs = await NewsCategoryRepo.findByLangCode(langCode);
  return ApiResponse.successResponse(
    res,
    200,
    recs,
    'Records fetched successfully'
  );
});

export default router;
