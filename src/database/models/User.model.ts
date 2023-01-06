import mongoose, { Schema } from 'mongoose';

import IUser from '../../types/user.type';

export const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
    },
    authProvider: {
      type: {
        id: String,
        name: String,
        token: String,
      },
      select: false,
    },
    profilePictureUrl: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', schema);
