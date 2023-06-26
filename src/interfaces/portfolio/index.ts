import { PortfolioStockInterface } from 'interfaces/portfolio-stock';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PortfolioInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  portfolio_stock?: PortfolioStockInterface[];
  user?: UserInterface;
  _count?: {
    portfolio_stock?: number;
  };
}

export interface PortfolioGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
