export interface ITransaction {
  title: string;
  type: string;
  category: string;
  description?: string;
  owner: number;
  user_owner: number;
  amount: number;
  transaction_id: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
