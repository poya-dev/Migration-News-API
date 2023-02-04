import mongoose, { Types, Schema } from 'mongoose';

import Consulting from '../../types/consulting.type';

export const schema = new Schema<Consulting>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    response: {
      type: {
        message: String,
        createdAt: Date,
      },
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Consulting>('Consulting', schema);
