export interface ISearchResult {
  results: Array<{
    id: number;
    subject: string;
    body: string;
    user_id: number;
    status: number;
    created_at: Date;
    updated_at: Date;
    account_id: number;
    category?: string;
  }>;
}
