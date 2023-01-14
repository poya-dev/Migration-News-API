import { Types } from 'mongoose';

import User from './user.type';
import NewsCategory from './newsCategory.type';

export default interface News {
  _id?: Types.ObjectId;
  title: string;
  content: string;
  imageUrl: string;
  status?: string;
  view_count: number;
  category: NewsCategory['_id'];
  createdBy?: User['_id'];
  updatedBy?: User['_id'];
  createdAt?: Date;
  updatedAt?: Date;
}
