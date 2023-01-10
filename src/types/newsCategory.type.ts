import { Types } from 'mongoose';

import User from './user.type';

export default interface NewsCategory {
  _id: Types.ObjectId;
  name: string;
  status?: string;
  createdBy?: User;
  updatedBy?: User;
  createdAt?: Date;
  updatedAt: Date;
}
