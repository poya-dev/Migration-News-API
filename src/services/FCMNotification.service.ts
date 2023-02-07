import admin from 'firebase-admin';
import {
  BatchResponse,
  MessagingDevicesResponse,
} from 'firebase-admin/lib/messaging/messaging-api';
import { Types } from 'mongoose';

import { fcmProjectId, fcmClientEmail, fcmPrivateKey } from '../config';

export type ToOnNotificationType = {
  token: string;
  id: Types.ObjectId;
  title: string;
  body: string;
  imageUrl?: string;
  type?: string;
};

export type ToAllNotificationType = {
  tokens: string[];
  id: Types.ObjectId;
  title: string;
  body: string;
  imageUrl: string;
  type?: string;
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
    payload: ToOnNotificationType
  ): Promise<MessagingDevicesResponse> {
    const messagePayload = {
      notification: {
        title: payload.title,
        body: payload.body,
      },
      body: {
        type: payload.type,
      },
    };
    return admin.messaging().sendToDevice(payload.token, messagePayload);
  }

  static async sendToMultiDevice(
    payload: ToAllNotificationType
  ): Promise<BatchResponse> {
    const notificationContent = {
      tokens: payload.tokens,
      notification: {
        title: payload.title,
        body: payload.body,
        imageUrl: payload.imageUrl,
      },
      body: {
        id: payload.id,
        type: payload.type,
      },
    };
    return admin.messaging().sendMulticast(notificationContent);
  }
}
