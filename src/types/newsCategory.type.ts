import { Types } from 'mongoose';

import Language from './language.type';
import User from './user.type';

export default interface NewsCategory {
  _id: Types.ObjectId;
  name: string;
  status?: string;
  language: Language['_id'];
  createdBy?: User['_id'];
  updatedBy?: User['_id'];
  createdAt?: Date;
  updatedAt: Date;
}
