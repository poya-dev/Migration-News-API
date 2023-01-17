import { Types } from 'mongoose';

import Language from './language.type';
import User from './user.type';

export default interface NewsCategory {
  _id: Types.ObjectId;
  name: string;
  language: Language['_id'];
  active?: Boolean;
  createdBy?: User['_id'];
  updatedBy?: User['_id'];
  createdAt?: Date;
  updatedAt: Date;
}
