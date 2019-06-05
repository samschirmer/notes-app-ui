export interface INote {
  name: string;
  category_id: number;
  status: number;
  subject: string;
  body: string;
  author: string;
  user_id: number;
  category: string;
  created_at: Date;
  updated_at: Date;
  account_id: number;
}
