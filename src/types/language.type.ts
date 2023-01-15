import { Types } from 'mongoose';

import User from './user.type';

export default interface Language {
  _id?: Types.ObjectId;
  name: string;
  code: string;
  flagUrl: string;
  status: string;
  createdBy?: User['_id'];
  updatedBy?: User['_id'];
  createdAt?: Date;
  updatedAt?: Date;
}
