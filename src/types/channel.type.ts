import { Types } from 'mongoose';

import User from './user.type';

export default interface Channel {
  _id?: Types.ObjectId;
  name: string;
  iconUrl: string;
  createdBy?: User['_id'];
  updatedBy?: User['_id'];
  createdAt?: Date;
  updatedAt?: Date;
}
