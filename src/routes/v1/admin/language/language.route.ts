import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import LanguageRepo from '../../../../database/repositories/LanguageRepo';
import ApiResponse from '../../../../utils/api-response';
import Language from '../../../../types/language.type';
import User from '../../../../types/user.type';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const rec = await LanguageRepo.findByName(req.body.name);
  if (rec)
    return ApiResponse.failureResponse(res, 401, 'Record already exists');
  const newRec = await LanguageRepo.create({
    name: req.body.name,
    code: req.body.code,
    createdBy: (req.user as User)._id,
    updatedBy: (req.user as User)._id,
  } as Language);
  return ApiResponse.successResponse(res, 201, newRec);
});

router.get('/', async (req: Request, res: Response) => {
  const recs = await LanguageRepo.findAll();
  setTimeout(() => {
    return ApiResponse.successResponse(res, 200, recs);
  }, 1000);
});

router.get('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await LanguageRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  return ApiResponse.successResponse(res, 200, rec);
});

router.get('/active', async (req: Request, res: Response) => {
  const recs = await LanguageRepo.findByActivateStatus(true);
  return ApiResponse.successResponse(res, 200, recs);
});

router.get('/inactive', async (req: Request, res: Response) => {
  const recs = await LanguageRepo.findByActivateStatus(false);
  return ApiResponse.successResponse(res, 200, recs);
});

router.put('/id/:id/activate', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await LanguageRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  const updateRec = await LanguageRepo.activate(new Types.ObjectId(id));
  return ApiResponse.successResponse(res, 200, updateRec);
});

router.put('/id/:id/deactivate', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await LanguageRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  await LanguageRepo.deactivate(new Types.ObjectId(id));
  return ApiResponse.successResponse(res, 200, rec);
});

router.put('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await LanguageRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  if (req.body.name) rec.name = req.body.name;
  if (req.body.code) rec.code = req.body.code;
  rec.updatedBy = (req.user as User)._id;
  const updateRec = await LanguageRepo.update(rec);
  return ApiResponse.successResponse(res, 200, updateRec);
});

router.delete('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await LanguageRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  const deleteRec = await LanguageRepo.remove(new Types.ObjectId(id));
  return ApiResponse.successResponse(res, 200, deleteRec);
});

export default router;
