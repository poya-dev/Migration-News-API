import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import { ToAllNotificationType } from '../../../../services/FCMNotification.service';
import NotificationService from '../../../../services/FCMNotification.service';
import NewsRepo from '../../../../database/repositories/NewsRepo';
import UserRepo from '../../../../database/repositories/UserRepo';
import ApiResponse from '../../../../utils/api-response';
import News from '../../../../types/news.type';
import User from '../../../../types/user.type';
import socket from '../../../../socket';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { name, email } = req.user as User;
  const user = { name, email };
  const rec = await NewsRepo.findByTitle(req.body.title);
  if (rec)
    return ApiResponse.failureResponse(res, 401, 'Record already exists.');
  const newRec = await NewsRepo.create({
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    language: req.body.language,
    category: req.body.category,
    channel: req.body.channel,
    createdBy: user,
    updatedBy: user,
  } as News);
  return ApiResponse.successResponse(res, 201, newRec);
});

router.get('/', async (req: Request, res: Response) => {
  const recs = await NewsRepo.findAll();
  socket.getIO().emit('newPost', 'New post available');
  setTimeout(() => {
    return ApiResponse.successResponse(res, 200, recs);
  }, 1000);
});

router.get('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found.');
  return ApiResponse.successResponse(res, 200, rec);
});

router.put('/id/:id/', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.user as User;
  const rec = await NewsRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found.');
  if (req.body.title) rec.title = req.body.title;
  if (req.body.content) rec.content = req.body.content;
  if (req.body.imageUrl) rec.imageUrl = req.body.imageUrl;
  if (req.body.language) rec.language = req.body.language;
  if (req.body.category) rec.category = req.body.category;
  if (req.body.channel) rec.channel = req.body.channel;
  rec.updatedBy = { name: name, email: email };
  await NewsRepo.update(rec);
  return ApiResponse.successResponse(res, 200, rec);
});

router.put('/id/:id/draft', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found.');
  await NewsRepo.actionSetDraft(new Types.ObjectId(id));
  return ApiResponse.successResponse(res, 200, rec);
});

router.put('/id/:id/published', async (req: Request, res: Response) => {
  const { id } = req.params;
  const sendNotification = req.query.sendNotification as string;
  const rec = await NewsRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found.');
  await NewsRepo.actionSetPublished(new Types.ObjectId(id));
  socket.getIO().emit('newPost', 'New post created');
  ApiResponse.successResponse(res, 200, rec);
  if (sendNotification.includes('true')) {
    const deviceTokens = await UserRepo.findAllDeviceToken();
    let batchTokens: string[] = [];
    if (deviceTokens && deviceTokens.length > 0) {
      for (let i = 0; i < deviceTokens.length; i += 100) {
        batchTokens = [...deviceTokens.slice(i, (i += 100))];
        const notification = {
          tokens: batchTokens,
          id: rec._id,
          title: rec.title,
          body: rec.content,
          imageUrl: rec.imageUrl,
          type: 'News',
        } as ToAllNotificationType;
        try {
          await NotificationService.sendToMultiDevice(notification);
          console.log('*** Notification sent successfully ***');
        } catch (e) {
          console.log('** Unfortunately notification Failed to send **', e);
          break;
        }
      }
    }
  }
});

router.put('/id/:id/archived', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found.');
  await NewsRepo.actionSetArchived(new Types.ObjectId(id));
  return ApiResponse.successResponse(res, 200, rec);
});

router.delete('/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const rec = await NewsRepo.findById(new Types.ObjectId(id));
  if (!rec) return ApiResponse.failureResponse(res, 404, 'Record not found');
  const deleteRec = await NewsRepo.remove(new Types.ObjectId(id));
  return ApiResponse.successResponse(res, 200, deleteRec);
});

export default router;
