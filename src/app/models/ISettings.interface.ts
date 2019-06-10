import { ICategory } from './ICategory.interface';
import { IUser } from './IUser.interface';

export interface ISettings {
  categories: Array<ICategory>;
  users: Array<IUser>;
  company: {
    id: number,
    name: string
  };
  plan: {
    id: number,
    name: string
  };
}
