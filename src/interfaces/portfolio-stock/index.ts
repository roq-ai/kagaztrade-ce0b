import { PortfolioInterface } from 'interfaces/portfolio';
import { StockInterface } from 'interfaces/stock';
import { GetQueryInterface } from 'interfaces';

export interface PortfolioStockInterface {
  id?: string;
  portfolio_id?: string;
  stock_id?: string;
  created_at?: any;
  updated_at?: any;

  portfolio?: PortfolioInterface;
  stock?: StockInterface;
  _count?: {};
}

export interface PortfolioStockGetQueryInterface extends GetQueryInterface {
  id?: string;
  portfolio_id?: string;
  stock_id?: string;
}
