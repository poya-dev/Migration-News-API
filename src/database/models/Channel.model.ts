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
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Channel>('Channel', schema);
