import { ICategory } from './ICategory.interface';
import { IUser } from './IUser.interface';
import { IPlan } from './IPlan.interface';

export interface ISettings {
  user: IUser;
  categories: Array<ICategory>;
  users: Array<IUser>;
  company: {
    id: number,
    name: string
  };
  plan: IPlan;
}
