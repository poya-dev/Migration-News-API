import mongoose, { Schema } from 'mongoose';

import Language from '../../types/language.type';

export const schema = new Schema<Language>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
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

export default mongoose.model<Language>('Language', schema);
