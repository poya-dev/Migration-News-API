import mongoose, { Types, Schema } from 'mongoose';

import Channel from '../../types/channel.type';

export const schema = new Schema<Channel>(
  {
    name: {
      type: String,
      required: true,
    },
    iconUrl: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Channel>('Channel', schema);
