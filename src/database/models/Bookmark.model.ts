import mongoose, { Types, Schema } from 'mongoose';

import Bookmark from '../../types/bookmark.type';

export const schema = new Schema<Bookmark>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    news: {
      type: Types.ObjectId,
      ref: 'News',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Bookmark>('Bookmark', schema);
