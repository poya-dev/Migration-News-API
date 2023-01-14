import mongoose, { Schema } from 'mongoose';

import Language from '../../types/language.type';

export const schema = new Schema<Language>(
  {
    name: {
      type: String,
      required: true,
    },
    iconUrl: {
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

export default mongoose.model<Language>('Language', schema);
