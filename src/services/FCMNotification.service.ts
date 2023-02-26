import admin from 'firebase-admin';
import {
  BatchResponse,
  MessagingDevicesResponse,
} from 'firebase-admin/lib/messaging/messaging-api';
import { Types } from 'mongoose';

import { fcmProjectId, fcmClientEmail, fcmPrivateKey } from '../config';

export type ToOneNotificationType = {
  token: string;
  title: string;
  body: string;
};

export type ToAllNotificationType = {
  tokens: string[];
  id: Types.ObjectId;
  title: string;
  body: string;
  imageUrl: string;
};

export default class NotificationService {
  static initializeService(): admin.app.App {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: fcmProjectId,
        clientEmail: fcmClientEmail,
        privateKey: fcmPrivateKey,
      }),
    });
  }

  static async sendToOneDevice(
    payload: ToOneNotificationType
  ): Promise<MessagingDevicesResponse> {
    const messagePayload = {
      notification: {
        title: payload.title,
        body: payload.body,
      },
      data: {
        type: 'Consulting',
      },
    };
    return admin.messaging().sendToDevice(payload.token, messagePayload);
  }

  static async sendToMultiDevice(
    payload: ToAllNotificationType
  ): Promise<BatchResponse> {
    const notificationPayload = {
      tokens: payload.tokens,
      notification: {
        title: payload.title,
        body: payload.body,
        imageUrl: payload.imageUrl,
      },
      data: {
        id: payload.id.toString(),
        type: 'Post',
      },
    };
    return admin.messaging().sendMulticast(notificationPayload);
  }
}
