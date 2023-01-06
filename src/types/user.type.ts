import { Types } from 'mongoose';

import IAuthProvider from './authProvider.type';

export default interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role?: string;
  authProvider?: IAuthProvider;
  profilePictureUrl?: string;
  isVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
