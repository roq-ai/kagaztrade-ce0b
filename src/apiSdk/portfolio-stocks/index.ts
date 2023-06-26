import axios from 'axios';
import queryString from 'query-string';
import { PortfolioStockInterface, PortfolioStockGetQueryInterface } from 'interfaces/portfolio-stock';
import { GetQueryInterface } from '../../interfaces';

export const getPortfolioStocks = async (query?: PortfolioStockGetQueryInterface) => {
  const response = await axios.get(`/api/portfolio-stocks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPortfolioStock = async (portfolioStock: PortfolioStockInterface) => {
  const response = await axios.post('/api/portfolio-stocks', portfolioStock);
  return response.data;
};

export const updatePortfolioStockById = async (id: string, portfolioStock: PortfolioStockInterface) => {
  const response = await axios.put(`/api/portfolio-stocks/${id}`, portfolioStock);
  return response.data;
};

export const getPortfolioStockById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/portfolio-stocks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePortfolioStockById = async (id: string) => {
  const response = await axios.delete(`/api/portfolio-stocks/${id}`);
  return response.data;
};
