import mongoose, { Schema } from 'mongoose';

import News from '../../types/news.type';

export const schema = new Schema<News>(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Published'],
      default: 'Draft',
    },
    view_count: {
      type: Schema.Types.Number,
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'NewsCategory',
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<News>('News', schema);
