import mongoose, { Schema } from 'mongoose';

import NewsCategory from '../../types/newsCategory.type';

export const schema = new Schema<NewsCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    language: {
      type: Schema.Types.ObjectId,
      ref: 'Language',
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
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

export default mongoose.model<NewsCategory>('NewsCategory', schema);
