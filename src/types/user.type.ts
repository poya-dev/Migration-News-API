import { Types } from 'mongoose';

import AuthProvider from './authProvider.type';

export default interface User {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role?: string;
  authProvider?: AuthProvider;
  userPictureUrl?: string;
  bookmarkNews: [Types.ObjectId];
  isVerified?: boolean;
  lastActive?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
