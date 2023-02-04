import { Types } from 'mongoose';

import User from './user.type';

export default interface Consulting {
  _id?: Types.ObjectId;
  name: string;
  address: string;
  phone: string;
  response?: { message: string; createdAt: Date };
  createdBy?: User['_id'];
  createdAt?: Date;
  updatedAt?: Date;
}
