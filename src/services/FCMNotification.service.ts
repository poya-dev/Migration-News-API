import admin from 'firebase-admin';
import { Types } from 'mongoose';
import {
  BatchResponse,
  MessagingDevicesResponse,
  MulticastMessage,
  MessagingPayload,
} from 'firebase-admin/lib/messaging/messaging-api';

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
    } as MessagingPayload;
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
      },
      data: {
        id: payload.id.toString(),
        type: 'Post',
      },
    } as MulticastMessage;
    return admin.messaging().sendMulticast(notificationPayload);
  }
}
