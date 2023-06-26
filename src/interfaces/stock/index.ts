import { PortfolioStockInterface } from 'interfaces/portfolio-stock';
import { TradeInterface } from 'interfaces/trade';
import { ExchangeInterface } from 'interfaces/exchange';
import { GetQueryInterface } from 'interfaces';

export interface StockInterface {
  id?: string;
  symbol: string;
  name: string;
  exchange_id?: string;
  created_at?: any;
  updated_at?: any;
  portfolio_stock?: PortfolioStockInterface[];
  trade?: TradeInterface[];
  exchange?: ExchangeInterface;
  _count?: {
    portfolio_stock?: number;
    trade?: number;
  };
}

export interface StockGetQueryInterface extends GetQueryInterface {
  id?: string;
  symbol?: string;
  name?: string;
  exchange_id?: string;
}
