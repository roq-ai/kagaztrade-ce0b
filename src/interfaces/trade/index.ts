import { StockInterface } from 'interfaces/stock';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TradeInterface {
  id?: string;
  type: string;
  quantity: number;
  price: number;
  stock_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  stock?: StockInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TradeGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  stock_id?: string;
  user_id?: string;
}
