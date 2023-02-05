import { Types } from 'mongoose';

import User from './user.type';
import News from './news.type';

export default interface Bookmark {
  _id?: Types.ObjectId;
  user?: User['_id'];
  news?: News['_id'];
}
