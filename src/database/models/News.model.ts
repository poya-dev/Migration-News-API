import mongoose, { Schema } from 'mongoose';

import News from '../../types/news.type';

const NEWS_STATUS = ['Draft', 'Published', 'Archived'];

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
      enum: NEWS_STATUS,
      default: 'Draft',
    },
    view_count: {
      type: Schema.Types.Number,
      default: 0,
    },
    language: {
      type: {
        name: String,
        code: String,
      },
      required: true,
    },
    channel: {
      type: {
        name: String,
        iconUrl: String,
      },
      required: true,
    },
    category: {
      type: {
        name: String,
      },
      required: true,
    },
    createdBy: {
      type: {
        name: String,
        email: String,
      },
      required: true,
    },
    updatedBy: {
      type: {
        name: String,
        email: String,
      },
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<News>('News', schema);
