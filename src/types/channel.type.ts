import { Types } from 'mongoose';

import User from './user.type';

export default interface Channel {
  _id?: Types.ObjectId;
  name: string;
  iconUrl: string;
  createdBy?: User;
  updatedBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
