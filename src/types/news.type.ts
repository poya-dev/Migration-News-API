import { Types } from 'mongoose';

import User from './user.type';
import NewsCategory from './newsCategory.type';

export default interface News {
  _id?: Types.ObjectId;
  title: string;
  content: string;
  imageUrl: string;
  status?: string;
  category: NewsCategory;
  createdBy?: User;
  updatedBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
