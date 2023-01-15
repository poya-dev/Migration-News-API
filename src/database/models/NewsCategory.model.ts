import mongoose, { Schema } from 'mongoose';

import NewsCategory from '../../types/newsCategory.type';

export const schema = new Schema<NewsCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Published'],
      default: 'Draft',
    },
    language: {
      type: Schema.Types.ObjectId,
      ref: 'Language',
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

export default mongoose.model<NewsCategory>('NewsCategory', schema);
