import { Types } from 'mongoose';

interface Channel {
  name: string;
  iconUrl: string;
}
interface Language {
  name: string;
}
interface Category {
  name: string;
}
interface User {
  name: string;
  email: string;
}

export default interface News {
  _id?: Types.ObjectId;
  title: string;
  content: string;
  imageUrl: string;
  status?: string;
  view_count: number;
  channel: Channel;
  language: Language;
  category: Category;
  createdBy?: User;
  updatedBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
