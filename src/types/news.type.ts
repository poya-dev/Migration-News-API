import { Types } from 'mongoose';

import NewsCategory from './newsCategory.type';
import Language from './language.type';
import Channel from './channel.type';
import User from './user.type';

export default interface News {
  _id?: Types.ObjectId;
  title: string;
  content: string;
  imageUrl: string;
  status?: string;
  view_count: number;
  channel: Channel['_id'];
  language: Language['_id'];
  category: NewsCategory['_id'];
  createdBy?: User['_id'];
  updatedBy?: User['_id'];
  createdAt?: Date;
  updatedAt?: Date;
}
