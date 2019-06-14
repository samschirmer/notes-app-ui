export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  id?: number;
  status?: number;
  created_at?: Date;
  image?: string;
  password?: string;
  password_confirmation?: string;
  account_id?: number;
}
