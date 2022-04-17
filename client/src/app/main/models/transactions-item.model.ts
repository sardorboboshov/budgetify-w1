export interface ITransaction {
  title: string;
  type: string;
  category: string;
  description?: string;
  owner: number;
  user_owner: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
}
