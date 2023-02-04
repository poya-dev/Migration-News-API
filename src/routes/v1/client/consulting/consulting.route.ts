import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import ConsultingRepo from '../../../../database/repositories/ConsultingRepo';
import ApiResponse from '../../../../utils/api-response';
import Consulting from '../../../../types/consulting.type';
import User from '../../../../types/user.type';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const newRec = await ConsultingRepo.create({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    createdBy: (req.user as User)._id,
  } as Consulting);
  return ApiResponse.successResponse(res, 200, newRec);
});

router.get('/', async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const recs = await ConsultingRepo.findByUserId(new Types.ObjectId(_id));
  return ApiResponse.successResponse(res, 200, recs);
});

export default router;
