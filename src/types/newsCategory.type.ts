import { Types } from 'mongoose';

import User from './user.type';

export default interface NewsCategory {
  _id: Types.ObjectId;
  name: string;
  status?: string;
  createdBy?: User['_id'];
  updatedBy?: User['_id'];
  createdAt?: Date;
  updatedAt: Date;
}
