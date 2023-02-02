import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import ConsultationRepo from '../../../../database/repositories/ConsultationRepo';
import ApiResponse from '../../../../utils/api-response';
import Consultation from '../../../../types/consultation.type';
import User from '../../../../types/user.type';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const newRec = await ConsultationRepo.create({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    createdBy: (req.user as User)._id,
  } as Consultation);
  return ApiResponse.successResponse(res, 200, newRec);
});

router.get('/', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const rec = await ConsultationRepo.findByUserId(new Types.ObjectId(_id));
  return ApiResponse.successResponse(res, 200, rec);
});

export default router;
