import mongoose, { Types, Schema } from 'mongoose';

import Consultation from '../../types/consultation.type';

export const schema = new Schema<Consultation>(
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

export default mongoose.model<Consultation>('Consultation', schema);
