import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import NewsCategoryRepo from '../../../../database/repositories/NewsCategoryRepo';
import NewsCategory from '../../../../types/newsCategory.type';
import ApiResponse from '../../../../utils/api-response';
import User from '../../../../types/user.type';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const rec = await NewsCategoryRepo.findByName(req.body.name);
  if (rec)
    return ApiResponse.failureResponse(res, 401, 'Record already exists');
  const newRec = await NewsCategoryRepo.create({
    name: req.body.name,
    createdBy: (req.user as User)._id,
    updatedBy: (req.user as User)._id,
  } as NewsCategory);
  return ApiResponse.successResponse(
    res,
    201,
    newRec,
    'Record created successfully'
  );
});

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
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found.');
  return ApiResponse.successResponse(
    res,
    200,
    rec,
    'Record fetched successfully'
  );
});

router.put('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsCategoryRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  if (req.body.name) rec.name = req.body.name;
  rec.updatedBy = (req.user as User)._id;
  const updateRec = await NewsCategoryRepo.update(rec);
  return ApiResponse.successResponse(
    res,
    200,
    updateRec,
    'Record updated successfully'
  );
});

router.delete('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsCategoryRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  const deleteRec = await NewsCategoryRepo.remove(new Types.ObjectId(id));
  return ApiResponse.successResponse(
    res,
    200,
    deleteRec,
    'Record deleted successfully'
  );
});

export default router;
