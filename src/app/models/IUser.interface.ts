export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  status: number;
  email: string;
  created_at: Date;
  image?: string;
}
