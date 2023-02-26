import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import ConsultingRepo from '../../../../database/repositories/ConsultingRepo';
import { ToOneNotificationType } from '../../../../services/FCMNotification.service';
import NotificationService from '../../../../services/FCMNotification.service';
import UserRepo from '../../../../database/repositories/UserRepo';
import ApiResponse from '../../../../utils/api-response';
import socket from '../../../../socket';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const rec = await ConsultingRepo.findAll();
  return ApiResponse.successResponse(res, 200, rec);
});

router.put('/add-response/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await ConsultingRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  const newRec = await ConsultingRepo.addResponse(
    new Types.ObjectId(id),
    req.body.responseMessage
  );
  socket.getIO().emit('consultingResponse', 'Admin responded to your request');
  ApiResponse.successResponse(res, 200, newRec);
  const token = await UserRepo.findDeviceTokenById(
    new Types.ObjectId(rec.createdBy?._id)
  );
  if (token && token?.deviceToken) {
    try {
      const notification = {
        token: token.deviceToken,
        title: 'مشاوره تلفونی',
        body: newRec.response?.message,
      } as ToOneNotificationType;
      await NotificationService.sendToOneDevice(notification);
      console.log('*** Notification sent successfully ***');
    } catch (e) {
      console.log('** Unfortunately notification Failed to send **', e);
    }
  }
});

router.delete('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await ConsultingRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  const newRec = await ConsultingRepo.remove(new Types.ObjectId(id));
  return ApiResponse.successResponse(res, 200, newRec);
});

export default router;
