export interface INote {
  category_id: number;
  subject: string;
  body: string;
  status?: number;
  author?: string;
  user_id?: number;
  category?: string;
  created_at?: Date;
  updated_at?: Date;
  account_id?: number;
  id?: number;
}
