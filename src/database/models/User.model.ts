import mongoose, { Schema } from 'mongoose';

import User from '../../types/user.type';

export const schema = new Schema<User>(
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
      default: 'Admin',
    },
    authProvider: {
      type: {
        id: String,
        name: String,
      },
    },
    userPictureUrl: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastActive: {
      type: Date,
    },
    deviceToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model<User>('User', schema);
