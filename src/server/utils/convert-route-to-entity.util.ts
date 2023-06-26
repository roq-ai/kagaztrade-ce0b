const mapping: Record<string, string> = {
  exchanges: 'exchange',
  portfolios: 'portfolio',
  'portfolio-stocks': 'portfolio_stock',
  stocks: 'stock',
  trades: 'trade',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
