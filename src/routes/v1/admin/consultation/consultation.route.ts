import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import ConsultationRepo from '../../../../database/repositories/ConsultationRepo';
import ApiResponse from '../../../../utils/api-response';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const rec = await ConsultationRepo.findAll();
  return ApiResponse.successResponse(res, 200, rec);
});

router.put('/add-response/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await ConsultationRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  const newRec = await ConsultationRepo.addResponse(
    new Types.ObjectId(id),
    req.body.responseMessage
  );
  return ApiResponse.successResponse(res, 200, newRec);
});

router.delete('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await ConsultationRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  const newRec = await ConsultationRepo.remove(new Types.ObjectId(id));
  return ApiResponse.successResponse(res, 200, newRec);
});

export default router;
