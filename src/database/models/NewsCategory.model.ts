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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<NewsCategory>('NewsCategory', schema);
