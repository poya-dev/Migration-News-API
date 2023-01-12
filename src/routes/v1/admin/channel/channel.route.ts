import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import ChannelRepo from '../../../../database/repositories/ChannelRepo';
import ApiResponse from '../../../../utils/api-response';
import Channel from '../../../../types/channel.type';
import User from '../../../../types/user.type';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const rec = await ChannelRepo.findByName(req.body.name);
  if (rec)
    return ApiResponse.failureResponse(res, 401, 'Record already exists.');
  const newRec = await ChannelRepo.create({
    name: req.body.name,
    iconUrl: req.body.iconUrl,
    createdBy: (req.user as User)._id,
    updatedBy: (req.user as User)._id,
  } as Channel);
  return ApiResponse.successResponse(
    res,
    201,
    newRec,
    'Record created successfully.'
  );
});

router.get('/', async (req: Request, res: Response) => {
  const recs = await ChannelRepo.findAll();
  return ApiResponse.successResponse(
    res,
    200,
    recs,
    'Records fetched successfully.'
  );
});

router.get('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await ChannelRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found.');
  return ApiResponse.successResponse(
    res,
    200,
    rec,
    'Record fetched successfully.'
  );
});

router.put('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await ChannelRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  if (req.body.name) rec.name = req.body.name;
  if (req.body.iconUrl) rec.iconUrl = req.body.iconUrl;
  if (req.body.user) rec.updatedBy = req.body.user;
  rec.updatedBy = (req.user as User)._id;
  const updateRec = await ChannelRepo.update(rec);
  return ApiResponse.successResponse(
    res,
    200,
    updateRec,
    'Record updated successfully'
  );
});

router.delete('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await ChannelRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  const deleteRec = await ChannelRepo.remove(new Types.ObjectId(id));
  return ApiResponse.successResponse(
    res,
    200,
    deleteRec,
    'Record deleted successfully.'
  );
});

export default router;
